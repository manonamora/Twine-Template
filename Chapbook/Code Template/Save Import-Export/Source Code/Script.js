/* Maliface's Chapbook Save custom code 
	https://github.com/MalifaciousGames/Mali-s-Scripts/blob/main/chapbook-scripts
*/
; {
   window.SaveSystem = {

      config: {
         fileName: null, // a string or function that returns one
         extension: '.tw-save', // the file's extension
         encoded: true, // whether the save is encoded to base64 (larger but not human-readable)
         version: null, // the game version, can be anything
         metadata: null, // arbitrary data or a function that returns it

         // where you put callbacks responsible for updating saves from older versions of CHAPBOOK
         engineUpdaters: [],

         // where you put callbacks responsible for updating saves from older GAME versions
         gameUpdaters: []
      },

      getFileName(saveData) {

         switch (typeof this.config.fileName) {
            case 'string': return this.config.fileName;
            case 'function': return this.config.fileName.call(null, saveData);
         }

         const [m, date, hour] = new Date().toJSON().match(/(.+)T(.+)(?=\.)/);
         return engine.story.name() + '-save-' + date + '-' + hour;
      },

      // where we store states
      lastState: null,
      currentState: engine.state.saveToObject(),

      export() {

         const saveObject = {
            game: {
               ifid: engine.story.ifid(),
               version: this.config.version
            },
            state: this.lastState ?? this.currentState ?? engine.state.saveToObject(),
            chapbook: {
               version: engine.version
            }
         };

         // push current passage to last turn's state so it runs and plays properly
         saveObject.state.trail ??= [];
         saveObject.state.trail.push(engine.state.get('trail').at(-1));

         // set metadata
         if (typeof this.config.metadata === 'function') {
            saveObject.metadata = this.config.metadata.call(null, saveObject);
         } else if (this.config.metadata) {
            saveObject.metadata = this.config.metadata;
         }

         let json = JSON.stringify(saveObject);

         if (this.config.encoded) json = btoa(json.replace(/[^\x00-\x7F]/g, m => `u<(${m.codePointAt(0)}>`));

         const url = URL.createObjectURL(new Blob([json], { type: 'text/plain' })), link = document.createElement('a');

         link.href = url;
         link.download = this.getFileName() + this.config.extension;
         link.click();

         requestAnimationFrame(() => URL.revokeObjectURL(url));
      },

      import() {
         const input = document.createElement('input');

         input.type = 'file';
         input.accept = this.extension;

         input.onchange = () => {
            const reader = new FileReader();
            reader.onload = () => this.saveHandler(reader.result);
            reader.readAsText(input.files[0]);
         };

         input.click();
      },

      saveHandler(json) {
         // we receive the FileReader's results

         // decode if needed
         if (json.trim()[0] !== '{') json = atob(json).replace(/u<(\d+)>/g, (m, n) => String.fromCodePoint(n));

         let data;
         try {
            data = JSON.parse(json);
         } catch (e) {
            throw new Error(`Save file could not be parsed into a usable object, sorry.`);
         }

         const { game, state, chapbook } = data;

         // sanity checks
         if (!state) throw new Error(`Save file is lacking a state object, something went very wrong.`);
         if (game.ifid !== engine.story.ifid()) throw new Error(`Save file does not come from this game.`);

         // was made in an older version of chapbook, call the updaters if any
         if (chapbook.version !== engine.version && this.config.engineUpdaters?.length) {
            for (const cb of this.config.engineUpdaters) cb.call(null, data, chapbook.version, engine.version);
         }

         // came from an older version of the game, update
         if (game.version !== this.config.version && this.config.gameUpdaters?.length) {
            for (const cb of this.config.gameUpdaters) cb.call(null, data, game.version, this.config.version);
         }

         try {
            engine.state.restoreFromObject(state);
         } catch (e) {
            throw new Error(`Chapbook was unable to restore the saved state, this is an internal error.`);
         }

      }
   };

   engine.extend('2.0.0', () => {

      window.addEventListener('body-content-change', () => {
         SaveSystem.lastState = structuredClone(SaveSystem.currentState);
         SaveSystem.currentState = engine.state.saveToObject();
      });

      window.addEventListener('click', e => {
         const type = e.target.getAttribute('data-save');
         if (type) {
            SaveSystem[type]();
         }
      });

      engine.template.inserts.add({
         match: /^load save/i,
         render(label) {
            return `<a class="link" tabindex="0" role="link" data-save="import">${label ?? 'Load from file'}</a>`;
         }
      });

      engine.template.inserts.add({
         match: /^save to file/i,
         render(label) {
            return `<a class="link" tabindex="0" role="link" data-save="export">${label ?? 'Save to file'}</a>`;
         }
      });

   });
};
/* End of save system */

/* Custom functions for this template to display/hide the Saves Popup */
window.setup = {};
setup.showSaves = function(id) {
   document.getElementById(id).style.display='block',
   document.getElementById(id).style.visibility='visible'
}
setup.closeSaves = function(id) {
   document.getElementById(id).style.display='none';
   document.getElementById(id).style.visibility='hidden';
}
