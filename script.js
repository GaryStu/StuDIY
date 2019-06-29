
// Initialize Firebase
const firebaseConfig = {
apiKey: "AIzaSyBoWu-FQKyuskKlXF77SknhQazBi6tQpEI",
authDomain: "studiy.firebaseapp.com",
databaseURL: "https://studiy.firebaseio.com",
projectId: "studiy",
storageBucket: "studiy.appspot.com",
messagingSenderId: "973457443239",
appId: "1:973457443239:web:e6be93a824079bb0"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();


// Shortcuts to DOM elements
let lectureNotes = document.getElementById('LectureNotes');
let tutorials = document.getElementById('Tutorials');
let pyp = document.getElementById('PYP');
let misc = document.getElementById('Misc');
let extraPractice = document.getElementById('ExtraPractice');
let search = document.getElementById('search')
var coll = document.getElementsByClassName("collapsible");
let ll = document.getElementById('LectureNotes');
let pypElement = document.getElementById('PYP');
let tutorialsElement = document.getElementById('Tutorials');
let extraPracticeElement = document.getElementById('ExtraPractice');
let miscElement = document.getElementById('Misc');

// whether the tabs for each category is open, initially they were closed
let lectureNotesStatus = false;
let tutorialStatus = false;
let pypStatus = false;
let extraPracticeStatus = false;
let miscStatus = false;

var i;
// check whether any tab is clicked
for (i = 0; i < coll.length; i++) {
    //the event will fire when any of the tab is pressed
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        let search = document.getElementById('search')
      
        //tokenise and obtain the module code(e.g. "CS1231" instead of "CS1231 Discrete Structure")
        let moduleSelected = search.value;
        let moduleCode = moduleSelected.substr(0, moduleSelected.indexOf(" "));
        if (!lectureNotesStatus) {
            // if it was closed, we load the content, if not just let it be (since it is already reloaded)
            lectureNotesStatus = true;
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref().child(moduleCode + '/' + 'lectureNotes');
            
            // Find all the prefixes and items.
            listRef.listAll().then(
            function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                console.log(itemRef.fullPath);
                
                itemRef.getDownloadURL().then(function(url) {
                    //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                    viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                    // Populating the categories with links
                    let br = document.createElement('br');
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(itemRef.fullPath);
                    a.appendChild(linkText);
                    a.href = viewerUrl;
                    ll.appendChild(a);
                    ll.appendChild(br);
                });

            });
            }).catch(function(error) {
                console.log('error(Lecture Notes)');
            });
 
        } 
        if (!tutorialStatus ) {
            // if it was closed, we load the content, if not just let it be (since it is already reloaded)
            tutorialStatus = true;
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref().child(moduleCode + '/' + 'tutorials');
            
            // Find all the prefixes and items.
            listRef.listAll().then(
            function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                // Populating the categories with links

                itemRef.getDownloadURL().then(function(url) {
                    //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                    viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                    // Populating the categories with links
                    let br = document.createElement('br');
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(itemRef.fullPath);
                    a.appendChild(linkText);
                    a.href = viewerUrl;
                    tutorialsElement.appendChild(a);
                    tutorialsElement.appendChild(br);
                });
            });
            }).catch(function(error) {
                console.log('error(Tutorials)');
            });
        } 
        if (!pypStatus) {
            // if it was closed, we load the content, if not just let it be (since it is already reloaded)
            pypStatus = true;
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref().child(moduleCode + '/' + 'pastYearPapers');
            
            // Find all the prefixes and items.
            listRef.listAll().then(
            function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                console.log(itemRef.fullPath);
                itemRef.getDownloadURL().then(function(url) {
                    //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                    viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                    // Populating the categories with links
                    let br = document.createElement('br');
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(itemRef.fullPath);
                    a.appendChild(linkText);
                    a.href = viewerUrl;
                    pypElement.appendChild(a);
                    pypElement.appendChild(br);
                });
            });
            }).catch(function(error) {
                console.log('error(PYPs)');
            });
        } 
        if (!extraPracticeStatus) {
            // if it was closed, we load the content, if not just let it be (since it is already reloaded)
            extraPracticeStatus = true;
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref().child(moduleCode + '/' + 'extraPractice');
            
            // Find all the prefixes and items.
            listRef.listAll().then(
            function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                itemRef.getDownloadURL().then(function(url) {
                    //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                    viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                    // Populating the categories with links
                    let br = document.createElement('br');
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(itemRef.fullPath);
                    a.appendChild(linkText);
                    a.href = viewerUrl;
                    extraPracticeElement.appendChild(a);
                    extraPracticeElement.appendChild(br);
                });
            });
            }).catch(function(error) {
                console.log('error(Extra Practices)');
            });
        } 
        if (!miscStatus) {
            // if it was closed, we load the content, if not just let it be (since it is already reloaded)
            miscStatus = true;
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref().child(moduleCode + '/' + 'miscellaneous');
            
            // Find all the prefixes and items.
            listRef.listAll().then(
            function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                console.log(itemRef.fullPath);
                // Populating the categories with links
                let br = document.createElement('br');
                let a = document.createElement('a');
                let linkText = document.createTextNode(itemRef.fullPath);
                a.appendChild(linkText);
                a.href = "";
                miscElement.appendChild(a);
                miscElement.appendChild(br);

            });
            }).catch(function(error) {
                console.log('error(Miscellaneous)');
            });
        }

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}



