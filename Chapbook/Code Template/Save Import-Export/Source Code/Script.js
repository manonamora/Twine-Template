/* Maliface's Chapbook Save custom code 
	https://github.com/MalifaciousGames
*/
window.chapbookSave = {

   get fileName() {
      const [m, date, hour] = new Date().toJSON().match(/(.+)T(.+)(?=\.)/);
      return engine.story.name() + '-save-' + date + '-' + hour;
   },
   extension: '.tw-save',

   export(encode = true) {

      let json = JSON.stringify({
         ifid: engine.story.ifid(),
         state: engine.state.saveToObject()
      });

      if (encode) json = btoa(json.replace(/[^\x00-\x7F]/g, m => `UNI(${m.codePointAt(0)})`));

      const url = URL.createObjectURL(new Blob([json], { type: 'text/plain' })),
         link = document.createElement('a');

      link.href = url;
      link.download = this.fileName + this.extension;
      link.click();

      requestAnimationFrame(() => URL.revokeObjectURL(url));
   },

   decode(json) {

      //is encoded
      if (json[0].trim() !== '{') json = atob(json).replace(/UNI\((\d+)\)/g, (m, n) => String.fromCodePoint(n));

      let data;
      try {
         data = JSON.parse(json);
      } catch (e) {
         throw new Error(`Couldn't parse file into a usable object. Save file broken.`);
      }

      if (data.ifid !== engine.story.ifid()) throw new Error(`Save file comes from another game!`);

      return data;
   },

   import() {

      const dataHandler = data => {
         engine.state.restoreFromObject(this.decode(data).state);
      };

      const input = document.createElement('input');

      input.type = 'file';
      input.accept = this.extension;

      input.onchange = () => {
         const reader = new FileReader();
         reader.onload = () => dataHandler(reader.result);
         reader.readAsText(input.files[0]);
      };

      input.click();
   }
};


customElements.define('import-link', class extends HTMLElement {
   constructor() {
      super();

      this.addEventListener('click', () => chapbookSave.import());
      this.addEventListener('keyup', e => {
         if (e.key === 'Enter') chapbookSave.import();
      });

      this.setAttribute('tabindex', '0');
      this.setAttribute('role', 'link');
      this.setAttribute('title', 'Load game from file');
      this.classList.add('link');
   }
});

customElements.define('export-link', class extends HTMLElement {
   constructor() {
      super();

      this.addEventListener('click', () => chapbookSave.export());
      this.addEventListener('keyup', e => {
         if (e.key === 'Enter') chapbookSave.export();
      });

      this.setAttribute('tabindex', '0');
      this.setAttribute('role', 'link');
      this.setAttribute('title', 'Download save file');
      this.classList.add('link');
   }
});

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
