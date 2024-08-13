// TABLE OF CONTENT
  // I  - SETTINGS
  // II - IMPORT/EXPORT CUSTOM CODE

//---SETTINGS---
  // Theme
  window.settingThemeChange = function(mode) {
    $('body').removeClass('dark-theme sepia-theme light-theme');
    switch (mode) {
      case 2:
        $('body').addClass("sepia-theme");
        break;
      case 1:
        $('body').addClass("dark-theme");
        break;
      default:
        $('body').addClass("light-theme");
        break;
    }
  };
    // Font Family
  window.settingFontFamily = function(mode) {
    $('body').removeClass('serif sansserif monospace');
    switch (mode) {
      case 2:
        $('body').addClass("serif");
        break;
      case 1:
        $('body').addClass("sansserif");
        break;
      default:
        $('body').addClass("monospace");
        break;
    }
  };
    // Font Size
  window.settingFontSize = function(mode) {
    $('tw-story').css( "fontSize", mode + "em" );
  };
  
  //---IMPORT/EXPORT CUSTOM CODE---
    // Harlowe Save to File Custom Macro from Kajot-Dev
  let saveInput;
  
  const { dialog } = require("utils/renderutils");
  const privateSave = {
    //---CONFIGURABLES---
    cheatPassage: false, //string or false boolean
    binKey: 3,
    maxFileSize: 512, //KB
    extension: "sav", //lowercase and without '.'
    //---END OF CONFIGURABLES---
    openDialog: (message, func) => {
      func = typeof func == "function" ? func : () => {};
      if (typeof message == "string") {
        return $("tw-story").append(dialog({
          message,
          buttons: [
            {
              name: "OK",
              callback() {
                func();
              }
            }
          ]
        }));
      } else return null;
    },
    get: saveslot => {
      var archive = [];
      for (let key of Object.keys(localStorage)) {
        if (privateSave.verify(key, true, false, true) === true) {
          if (key.slice(49).trim() === saveslot) archive.push(key, localStorage.getItem(key));
        }
      }
      if (archive.length >= 2) {
        var output = archive.join('\n');
        return output;
      } else {
        return null;
      }
    },
    getDirect: slot => {
      let dataObj = State.serialise();
      let data = null;
      if (dataObj.hasOwnProperty("pastAndPresent")) data = dataObj.pastAndPresent;
      if (typeof data === "string") return "(Saved Game " + privateSave.storyUID + ") " + slot + "\n" + data;
      return null;
    },
    download: (input, fileType, fileName) => {
      if (!input || !fileType || !fileName) return null;
      var fObject = new Blob([input], {
        type: fileType
      });
      var dClick = document.createElement('a');
      dClick.setAttribute('download', fileName);
      dClick.setAttribute('id', 'savedownload');
      dClick.setAttribute('href', URL.createObjectURL(fObject));
      dClick.dataset.downloadurl = [fileType, dClick.download, dClick.href].join(':');
      dClick.style.display = 'none';
      dClick.click();
      setTimeout(function () {
        URL.revokeObjectURL(dClick.href);
      }, 1500);
    },
    encode: (input) => {
      let keys = privateSave.storyUID.split("-");
      input = privateSave.vigenere(input, keys[4]);
      let checkSum = privateSave.checkSum(input, keys[0]);
      input = privateSave.insertCheckSum(input, checkSum, keys[1] + keys[2]);
      input = privateSave.encodeBin(input, privateSave.binKey);
      return input;
    },
    decode: (input) => {
      let keys = privateSave.storyUID.split("-");
      input = privateSave.encodeBin(input, privateSave.binKey);
      let [text, checksum] = privateSave.pullCheckSum(input, keys[0].length, keys[1] + keys[2]);
      input = text;
      let tempVigenere = privateSave.vigenere(input, keys[4], true);
      let check = privateSave.verify(tempVigenere, false, true, false);
      if (check === true) {
        if (checksum === privateSave.checkSum(input, keys[0])) {
          input = tempVigenere;
          return input;
        } else return [null, "cheater"];
      } else return [null, check];
    },
    checkSum: (input, key) => {
      var kody = key.split("").map(x => x.charCodeAt(0));
      while (input.length % key.length != 0) input += ".";
      for (let i = 0; i < input.length / key.length; i++) {
        for (let j = 0; j < key.length; j++) {
          kody[j] = (kody[j] + input.charCodeAt(i * key.length + j)) % 128;
        }
      }
      var out = "";
      for (let i = 0; i < key.length; i++) {
        out += String.fromCharCode(65 + (kody[i] % 26));
      }
      return out;
    },
    insertCheckSum: (input, checksum, key) => {
      while (key.length < checksum.length) key += key;
      key = key.slice(0, checksum.length);
      var kody = key.split("").map(x => x.charCodeAt(0));
      for (let i = 0; i < checksum.length; i++) {
        if (kody[i] < input.length) {
          input = input.slice(0, kody[i]) + checksum[i] + input.slice(kody[i]);
        } else {
          input += checksum[i];
        }
      }
      return input;
    },
    pullCheckSum: (input, checksumLength, key) => {
      while (key.length < checksumLength) key += key;
      key = key.slice(0, checksumLength);
      var kody = key.split("").map(x => x.charCodeAt(0)).reverse();
      var out = "";
      for (let i = 0; i < checksumLength; i++) {
        if (kody[i] < input.length) {
          out += input[kody[i]];
          input = input.slice(0, kody[i]) + input.slice(kody[i] + 1);
        } else {
          out += input[input.length - 1];
          input = input.slice(0, -1);
        }
      }
      out = out.split("").reverse().join("");
      return [input, out];
    },
    vigenere: (input, key, decode) => {
      key = key.length <= input.length ? key : key.slice(0, input.length);
      let pop = 0;
      var out = "";
      for (let i = 0; i < input.length; i++) {
        if (privateSave.vigenereAlphabet.includes(input[i])) {
          let x = privateSave.vigenereAlphabet.indexOf(input[i]);
          let y = privateSave.vigenereAlphabet.indexOf(key[(i - pop) % key.length]);
          if (!decode) {
            x = (x + y) % privateSave.vigenereAlphabet.length;
          } else {
            x -= y;
            if (x < 0) x += privateSave.vigenereAlphabet.length;
          }
          out += privateSave.vigenereAlphabet[x];
        } else {
          out += input[i];
          pop++;
        }
      }
      return out;
    },
    encodeBin: (input, key) => {
      if (typeof key !== 'number') return input;
      key = key.toString();
      var output = '';
      input = input.toString();
      for (let i = 0; i < input.length; i++) {
        let currentLetter = input.charCodeAt(i);
        let encodedLetter = currentLetter ^ key;
        output += String.fromCharCode(encodedLetter);
      }
      return output;
    },
    verify: (text, filBool, commands, verSave) => {
      text = text.includes("\n") ? text.split("\n")[0] : text;
      let StoryId = text.includes('Filename') ? text.slice(21, 57).trim() : text.slice(12, 48).trim();
      filBool = filBool ? !text.includes('Filename') : true;
      verSave = verSave ? text.slice(1, 11).trim() !== "Saved Game" : false;
      if ((text[0] !== "(" || text[6] !== " " || text[11] !== " ") || verSave) {
        if (commands) privateSave.openDialog("This is not a Twine save... is it?");
        return "corrupted_save_name";
      }
      if (StoryId !== privateSave.storyUID) {
        if (commands) privateSave.openDialog("I can't open this save, it's from another Twine game!");
        return "wrong_id";
      }
      if (!filBool) return "wrong_save_key";
      return true;
    },
    process: (fileInput, targetslot, slots, section) => {
      return new Promise((resolve, reject) => {
        slots = Array.isArray(slots) ? slots : [slots];
        var file = fileInput.files[fileInput.files.length - 1];
        if (file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase() !== privateSave.extension) {
          privateSave.openDialog("Wrong extension, correct one is: ." + privateSave.extension);
          reject("wrong_extension");
          return;
        }
        if (!file || (file.size / 1024) > privateSave.maxFileSize) {
          privateSave.openDialog("File too large (or your browser couldn't provide it)");
          reject("none/too_large");
          return;
        }
        var fileRead = new FileReader();
        fileRead.readAsText(file);
        fileRead.onload = ready => {
          let input = ready.target.result;
          if (input.length <= 50) {
            privateSave.openDialog("Empty/too short file!");
            reject("empty/too_short");
            return;
          }
          input = privateSave.decode(input);
          if (Array.isArray(input)) {
            reject(input[1]);
            return;
          }
          if (input.slice(1, 11) !== "Saved Game") {
            privateSave.openDialog("I can't load this save - is this even a save file?");
            reject("no_phrase");
            return;
          }
          var saveArray = input.split('\n');
          if (saveArray.length < 2) {
            privateSave.openDialog("I can't load this save - can't unpack it!");
            reject("no_line_break");
            return;
          }
          let key = saveArray[0];
          var saveName = key.slice('49').trim();
          if (slots.includes(saveName)) {
            const possibleErr = State.deserialise(section, saveArray[1]);
            if (!(possibleErr instanceof Error)) { //if this returns true, we are absolutely sure, that save is gonna work
              localStorage.setItem("(Saved Game " + privateSave.storyUID + ") " + targetslot, saveArray[1]);
              resolve(true);
            } else {
              console.error(possibleErr);
              privateSave.openDialog("Save corrupted - Twine refused loading it!");
              reject("corrupted_save_data");
            }
          } else {
            privateSave.openDialog("I'm not allowed to load this save!");
            reject("wrong_slot");
          }
        };
        fileRead.onerror = () => {
          privateSave.openDialog("Error reading the file!");
          reject("file_error");
        };
      });
    },
    file: (name, slot) => {
      var saveOutput = privateSave.get(slot);
      if (saveOutput) {
        saveOutput = privateSave.encode(saveOutput);
        privateSave.download(saveOutput, "text/plain", name + "." + privateSave.extension);
      } else {
        privateSave.openDialog("I can't download save which doesn't exists!");
        console.error(...privateSave.appPrefix, "I can't download save which doesn't exists!");
      }
    },
    fileDirect: (name, slot) => {
      let saveData = privateSave.getDirect(slot);
      if (saveData === null) {
        privateSave.openDialog("I couldn't download save - probably Twine's error!");
        return null;
      }
      saveData = privateSave.encode(saveData);
      privateSave.download(saveData, "text/plain", name + "." + privateSave.extension);
    },
    read: (slot, slots, section) => {
      var fileSave = saveInput;
      if (!fileSave) {
        fileSave = document.createElement('input');
        fileSave.setAttribute('type', 'file');
        fileSave.setAttribute('id', 'saveupload');
        fileSave.style.display = 'none';
        fileSave.setAttribute('accept', "." + privateSave.extension);
        fileSave.setAttribute('size', '1');
        fileSave.addEventListener("change", () => {
          privateSave.process(fileSave, slot, slots, section).then(() => {
            fileSave.remove();
            saveInput = undefined;
            Engine.showPassage(State.passage);
            console.log(...privateSave.appPrefix, "Reading from file succesfull");
          }).catch(reason => {
            fileSave.remove();
            saveInput = undefined;
            console.error(...privateSave.appPrefix, "Error reading from file:", reason);
            if (reason == "cheater") {
              if (privateSave.cheatPassage) Engine.goToPassage(privateSave.cheatPassage);
              else privateSave.openDialog("Oszust!");
            }
          });
        }, {
          once: true
        });
        saveInput = fileSave;
      }
      fileSave.click();
    },
    vigenereAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
    storyUID: document.querySelector('tw-storydata').getAttribute('ifid'),
    appPrefix: ["%cSAVE TO FILE:", "font-weight: bold"]
  };
  
  Object.freeze(privateSave);
  console.info(privateSave.appPrefix[0] + "%c Save to file script is ready!", privateSave.appPrefix[1], "color: green;");
  const Macros = require("macros");
  const TwineError = require("internaltypes/twineerror");
  const TwineNotifier = require("internaltypes/twinenotifier");
  Macros.add("readfromfile", "Instant", function (section, ...args) {
    let t = "";
    if (args.length > 0) {
      let accepted = [];
      if (args.length > 1) accepted = args.slice(1, args.length);
      else accepted = [args[0]];
      privateSave.read(args[0], accepted, section);
    }
    if (Utils.options.debug) t += "(readfromfile:"+args.toString()+ ")";
    return {
      TwineScript_TypeID: "instant",
      TwineScript_TypeName: "a (readfromfile:) operation",
      TwineScript_ObjectName: "a (readfromfile:) operation",
      TwineScript_Unstorable: true,
      TwineScript_Print: function () {
        return t && TwineNotifier.create(t).render()[0].outerHTML;
      }
    }
  }, [String, Macros.TypeSignature.zeroOrMore(String)]);
  Macros.add("savetofile", "Instant", function (_, n, s) {
    let t = "";
    n = n.trim();
    if (n === "" || s === "") return TwineError.create("macrocall", "This macro does not accept empty strings!");
    privateSave.file(n, s);
    if (Utils.options.debug) t += "(savetofile:"+n+", "+s+")";
    return {
      TwineScript_TypeID: "instant",
      TwineScript_TypeName: "a (savetofile:) operation",
      TwineScript_ObjectName: "a (savetofile:) operation",
      TwineScript_Unstorable: true,
      TwineScript_Print: function () {
        return t && TwineNotifier.create(t).render()[0].outerHTML;
      }
    }
  }, [String, String]);
  Macros.add("savetofiledirect", "Instant", function (_, n, s) {
    let t = "";
    n = n.trim();
    if (n === "" || s === "") return TwineError.create("macrocall", "This macro does not accept empty strings!");
    privateSave.fileDirect(n, s);
    if (Utils.options.debug) t += "(savetofiledirect:"+n+", "+s+")";
    return {
      TwineScript_TypeID: "instant",
      TwineScript_TypeName: "a (savetofiledirect:) operation",
      TwineScript_ObjectName: "a (savetofiledirect:) operation",
      TwineScript_Unstorable: true,
      TwineScript_Print: function () {
        return t && TwineNotifier.create(t).render()[0].outerHTML;
      }
    }
  }, [String, String]);