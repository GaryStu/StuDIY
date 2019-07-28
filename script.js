
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

let year1 = 0;
let year2 = 0;
let sem1 = 0;
let sem2 = 0;
let titleDisplay1 = 0;
let titleDisplay2 = 0;

// category Array
var catArray = new Array(5);
for (let i = 0; i < 5; i++) {
    if (!catArray[i]) {
        catArray[i] = [];
    }
}
// check whether any tab is clicked
for (let i = 0; i < coll.length; i++) {
    //the event will fire when any of the tab is pressed
    coll[i].addEventListener("click", function(event, sorting) {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        let search = document.getElementById('search')
      
        //tokenise and obtain the module code(e.g. "CS1231" instead of "CS1231 Discrete Structure")
        let moduleSelected = search.value;
        let moduleCode = moduleSelected.substr(0, moduleSelected.indexOf(" "));
        var lectureNotesArray = []; 
        var tutorialArray = [];
        var pypArray = [];
        var extraPracticeArray = [];
        var miscArray = [];
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
                //push the itemRef to the lectureNotesArray to be sorted later
                lectureNotesArray.push(itemRef);
                catArray[0].push(itemRef);

                /*
                itemRef.getMetadata().then(function(metadata) {
                    console.log(metadata.customMetadata.year);
                }).catch(function(error) {
                    console.log('error metadata or metadata does not exist');
                });
                */

                /*
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
                */
            });
            }).then (function () {
                lectureNotesArray.forEach(function (element) {
                
                    element.getDownloadURL().then(function(url) {
                        
                        element.getMetadata().then(function(elementMetadata) {
                            //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                            viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                            // Populating the categories with links
                            let br = document.createElement('br');
                            let a = document.createElement('a');
                            //console.log(metadata.customMetadata.year);
                            elementTitleDisplay = elementMetadata.customMetadata.finalDisplay;
                            console.log(elementTitleDisplay);
                            let linkText = document.createTextNode(elementTitleDisplay);
                            a.appendChild(linkText);
                            a.href = viewerUrl;
                            ll.appendChild(a);
                            ll.appendChild(br);
                        }).catch(function(error) {
                            console.log('error metadata or metadata does not exist');
                        }); 

                    });
                });
                }).then(function () {
                    catArray[0].sort(function (item1, item2) {
                    // Sort by year (the most recent year first)
                    console.log('started sorting');
                    
                    item1.getMetadata().then(function(metadata1) {
                        //console.log(metadata.customMetadata.year);
                        window.year1 = parseInt(((metadata1.customMetadata.year).split("-"))[0], 10);
                        window.sem1 = parseInt(((metadata1.customMetadata.semester).split(" "))[1], 10);
                        window.titleDisplay1 = parseInt(((metadata1.customMetadata.titleDisplay).split(" "))[1], 10);
                    }).catch(function(error) {
                        console.log('error metadata or metadata does not exist');
                    }); 

                    item2.getMetadata().then(function(metadata2) {
                        //console.log(metadata.customMetadata.year);
                        window.year2 = (metadata2.customMetadata.year);
                        window.sem2 = ((metadata2.customMetadata.semester).split(" "))[1];
                        window.titleDisplay2 = parseInt(((metadata2.customMetadata.titleDisplay).split(" "))[1], 10);
                    }).catch(function(error) {
                        console.log('error metadata or metadata does not exist');
                    }); 
                    if (titleDisplay1 === titleDisplay2) console.log('same');
                    else if (titleDisplay1 > titleDisplay2) console.log('bigger');
                    else if (titleDisplay1 < titleDisplay2) console.log('smaller');
                    if (year1 < year2) {
                        return 1; //if the first year is lower than the second year the second year comes first
                    }
                    if (year1 > year2) {
                        return -1;
                    }
                    
                    // Sort by semester (the early semester first)
                    if (sem1 < sem2) {
                        return -1;
                    }
                    if (sem1 > sem2) {
                        return 1;
                    }

                    // Sort by titleDisplay (chapters)
                    if (titleDisplay1 < titleDisplay2) {
                        return -1;
                    }
                    if (titleDisplay1 > titleDisplay2) {
                        return 1;
                    }
                });
                })
                .catch(function(error) {
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

                tutorialArray.push(itemRef);
                /*
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
                */
            });
            }).then(function () {
                tutorialArray.forEach(function (element) {
                
                    element.getDownloadURL().then(function(url) {
                        
                        element.getMetadata().then(function(elementMetadata) {
                            //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                            viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                            // Populating the categories with links
                            let br = document.createElement('br');
                            let a = document.createElement('a');
                            //console.log(metadata.customMetadata.year);
                            elementTitleDisplay = elementMetadata.customMetadata.finalDisplay;
                            console.log(elementTitleDisplay);
                            let linkText = document.createTextNode(elementTitleDisplay);
                            a.appendChild(linkText);
                            a.href = viewerUrl;
                            tutorialsElement.appendChild(a);
                            tutorialsElement.appendChild(br);
                        }).catch(function(error) {
                            console.log('error metadata or metadata does not exist');
                        }); 

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
                pypArray.push(itemRef);
                /*
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
                */
            });
            }).then (function () {
                pypArray.forEach(function (element) {
                    element.getDownloadURL().then(function(url) {
                        
                        element.getMetadata().then(function(elementMetadata) {
                            //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                            viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                            // Populating the categories with links
                            let br = document.createElement('br');
                            let a = document.createElement('a');
                            //console.log(metadata.customMetadata.year);
                            elementTitleDisplay = elementMetadata.customMetadata.finalDisplay;
                            console.log(elementTitleDisplay);
                            let linkText = document.createTextNode(elementTitleDisplay);
                            a.appendChild(linkText);
                            a.href = viewerUrl;
                            pypElement.appendChild(a);
                            pypElement.appendChild(br);
                        }).catch(function(error) {
                            console.log('error metadata or metadata does not exist');
                        }); 
                    });
                });
            })
            .catch(function(error) {
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
                extraPracticeArray.push(itemRef);

                /*
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
                */
            });
            }).then(function () {
                    extraPracticeArray.forEach(function (element) {
                    element.getDownloadURL().then(function(url) {
                        
                        element.getMetadata().then(function(elementMetadata) {
                            //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                            viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                            // Populating the categories with links
                            let br = document.createElement('br');
                            let a = document.createElement('a');
                            //console.log(metadata.customMetadata.year);
                            elementTitleDisplay = elementMetadata.customMetadata.finalDisplay;
                            console.log(elementTitleDisplay);
                            let linkText = document.createTextNode(elementTitleDisplay);
                            a.appendChild(linkText);
                            a.href = viewerUrl;
                            extraPracticeElement.appendChild(a);
                            extraPracticeElement.appendChild(br);
                        }).catch(function(error) {
                            console.log('error metadata or metadata does not exist');
                        }); 
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
                miscArray.push(itemRef);
                /*
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
                    miscElement.appendChild(a);
                    miscElement.appendChild(br);
                });
                */
            });
            }).then(function () {
                miscArray.forEach(function (element) {
                    element.getDownloadURL().then(function(url) {
                        
                        element.getMetadata().then(function(elementMetadata) {
                            //using the GET method to concatenate the link url of the pdf that will be opened in pdfViewer
                            viewerUrl = 'pdfViewer/pdfViewer.html?name' + encodeURIComponent(url);
                            // Populating the categories with links
                            let br = document.createElement('br');
                            let a = document.createElement('a');
                            //console.log(metadata.customMetadata.year);
                            elementTitleDisplay = elementMetadata.customMetadata.finalDisplay;
                            console.log(elementTitleDisplay);
                            let linkText = document.createTextNode(elementTitleDisplay);
                            a.appendChild(linkText);
                            a.href = viewerUrl;
                            miscElement.appendChild(a);
                            miscElement.appendChild(br);
                        }).catch(function(error) {
                            console.log('error metadata or metadata does not exist');
                        }); 
                    });
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



