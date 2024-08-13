# ========* IFID CHANGE *========

## What is an IFID?
An IFID is a serial number assigned to every work of Interactive Fiction, and works like and ISBN for books. It helps especially for archiving.

In Twine, every project is automatically assigned an IFID when a project is created. Not every other IF system does so.

## Why change an IFID?
> TLDR: like books can't have the same ISBN, IF games should NOT have the same IFID. 

If a project is uploaded on Twine but has the same IFID as one already in the library, Twine will ask you whether the new project should override the old one or stop the upload.

Since every of my templates and guides are created with the same IFID, it is important to assign a new IFID to the file before uploading it on Twine and edit it.\
Similarly, other Twine templates available out there have their specific IFID. If multiple people edit a same template to make their own project, you will get multiple games with the same IFID.

## How to change an IFID?
### In Twine (1)
1. Upload the template on Twine
2. Create a New Project
3. Copy Paste the code in the different passages + JavaScript + Stylesheet
4. Remove template from library
5. Edit your project

### In Twine (2)
1. Upload the template on Twine
2. Select the Template (but don't open it)
3. Click the Duplicate option (on the Menu bar at the top, or pre Twine 2.4, clicking the cog next to the title project)
4. Edit your new project

### HTML file
1. Open the HTML file (.html) in a source-code editor (like NotePad or VSCode)
2. CTRL/Cmd + F -> IFID or tw-storydata
    
[You should find something like this:

    <tw-storydata name="Harlowe Settings" startnode="20" creator="Twine" creator-version="2.9.2" format="Harlowe" format-version="3.3.9" ifid="37BFE9B3-93E0-4A2C-B74E-3FAEF445DBC3" options="" tags="" zoom="1" hidden="">
]

3. Generate a new IFID here:  https://www.tads.org/ifidgen/ifidgen
4. Replace the old IFID with the new one (Copy-Paste ontop of "37BFE9B3-93E0-4A2C-B74E-3FAEF445DBC3")

[It should look like this:
    
    <tw-storydata name="Harlowe Settings" startnode="20" creator="Twine" creator-version="2.9.2" format="Harlowe" format-version="3.3.9" ifid="THE NEW IFID PASTED HERE" options="" tags="" zoom="1" hidden="">

]

5. Save before closing
6. Upload the file on Twine and edit it at will.

### Twee file
If you have the latest version of Twine, you can upload Twee files like HTML ones.\
So when the IFID is changed, you can simply upload it to Twine.
> Do note: the Twee files do not include the JavaScript or CSS, as they are located in separate files (.js and .css respectively).

If you are using Tweego, just add the files in the src folder in the correct place, change the IFID, and continue editing at will!

1. Open the Twee file (.tw) in a source-code editor (like NotePad or VSCode)
2. Find the {StoryData} passage:

[It should look like this:

        {
            ifid": "37BFE9B3-93E0-4A2C-B74E-3FAEF445DBC3",
            format": "Harlowe",
            format-version": "3.3.9",
            start": "Start"
        }

[

3. Generate a new IFID here:    https://www.tads.org/ifidgen/ifidgen
4. Replace the old IFID with the new one (Copy-Paste ontop of "37BFE9B3-93E0-4A2C-B74E-3FAEF445DBC3")

[It should look like this:
    
    {
        ifid": "THE NEW IFID PASTED HERE",
        format": "Harlowe",
        format-version": "3.3.9",
        start": "Start"
    }

]

5. Save before closing
