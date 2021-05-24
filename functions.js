//set constants/config
var lang_key = 'razct_lang';
var last_reset_key = 'razct_last_reset';
var divide_faction_tabeles_key = 'razct_divide_faction_tables';
var faction_order_key = 'razct_faction_order';
var edit_mode_key = 'razct_editmode';
var prefix_charlist = 'razct_char_';
var default_lang = 'de';

// init page with saved data from localstorage
$( document ).ready(function() {
    initConfig();
    disableFormSubmit();
    addChangeEventToFactionSelect()
    //generateHtmlTableFromStorage();
    setLangClassToBody()

    // show Table
    generateHtmlTableFromStorage();
});

function initConfig()
{
  // init lang  
  var langVal = localStorage.getItem(lang_key);
  if (langVal === null) {
    localStorage.setItem(lang_key, default_lang);
  }

  // init last reset
  var lastResetVal = localStorage.getItem(last_reset_key);  
  if (lastResetVal === null) {
    localStorage.setItem(last_reset_key, 0);
  }
  
  // init divide faction tables
  var divideVal = localStorage.getItem(divide_faction_tabeles_key);  
  if (divideVal === null) {
    localStorage.setItem(divide_faction_tabeles_key, "false");
  }

  // init faction order
  var orderVal = localStorage.getItem(faction_order_key);  
  if (orderVal === null) {
    localStorage.setItem(faction_order_key, "imp");
  }

  // init edit mode
  var editModeVal = localStorage.getItem(edit_mode_key);  
  if (editModeVal === null) {
    localStorage.setItem(edit_mode_key, "false");
  }
}

function addNewChar()
{
  var formData = $( "form" ).serializeArray();
  formData = objectifyForm(formData);
  var charName = formData["charname"];
  var faction = formData["faction"];
  var charClass = formData["class"];
  var idForNewChar = findFirstUnusedCharIdForFaction(faction);
  var key = transformIdToCharlistKey(faction, idForNewChar)
  var lang = localStorage.getItem(lang_key);

  if(charClass == "undefined" || charClass == null)
  {
    alert(msgChooseClass[lang]);
    return;
  }
  if(charName == "")
  {
    alert(msgEnterName[lang]);
    return;
  }
  
  saveNewCharToLocalStorage(key, idForNewChar, charName, faction, charClass);
  
  generateHtmlTableFromStorage();
}

function remove(removeId)
{
    localStorage.removeItem(removeId);
    generateHtmlTableFromStorage();
}

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function toggleProgress(id) {
    var charFromStorageObj = JSON.parse(localStorage.getItem(id));
    //console.log(charFromStorageObj);
    //console.log(charFromStorageObj.id + " " + charFromStorageObj.progress_done);
    
    var done = charFromStorageObj.progress_done;
    
    if(done == "false")
      done = "true";
    else if (done == "true")
      done = "false";
    
    charFromStorageObj.progress_done = done;
    
    localStorage.setItem(id, JSON.stringify(charFromStorageObj));
    
    generateHtmlTableFromStorage();
}

function generateHtmlTableFromStorage()
{
  // empty anchor div to prevent to append multiple tables
  $( "#tableAnchor1" ).empty();
  $( "#tableAnchor2" ).empty();

  var divideTables = localStorage.getItem(divide_faction_tabeles_key);
  if(divideTables == "true")
  {
    generateDividedHtmlTableFromStorage()
  }
  else
  {
    generateMergedHtmlTableFromStorage()    
  }
}

function generateDividedHtmlTableFromStorage()
{
  var editMode = localStorage.getItem(edit_mode_key);
  var orderFaction = localStorage.getItem(faction_order_key);

  var firstFaction = orderFaction;
  var secondFaction = getOtherFaction(orderFaction);

  // table-tag and first row
  /*
  var table = '<table><tr><th>#</th><th>Name</th><th>Faction</th><th>Class</th><th>Progress done</th>';
  if(editMode == "true")
  {
    table += '<th>remove</th>';
  }
  table += '</tr>';
  */
  var table = generateTableHeadline();
  
  table += getCharTableRows(firstFaction);
  
  table += '</table>'; 

  // empty anchor div to prevent to append multiple tables
  $( "#tableAnchor1" ).append(table);
  
  // table-tag and first row
  /*
  var table = '<table><tr><th>#</th><th>Name</th><th>Faction</th><th>Class</th><th>Progress done</th>';
  if(editMode == "true")
  {
    table += '<th>remove</th>';
  }
  table += '</tr>';
  */
  var table = generateTableHeadline();
  
  table += getCharTableRows(secondFaction);  

  
  table += '</table>'; 

  // empty anchor div to prevent to append multiple tables
  $( "#tableAnchor2" ).append(table);
}

function generateMergedHtmlTableFromStorage()
{
  var editMode = localStorage.getItem(edit_mode_key);
  var orderFaction = localStorage.getItem(faction_order_key);
  
  var lang = localStorage.getItem(lang_key);
  
  //access the prefered language text from array, lang = en/de
  //console.log(th_faction[lang]);
 
  // table-tag and first row
  //var table = '<table><tr><th>#</th><th>Name</th><th>Faction</th><th>Class</th><th>Progress done</th>';

  /*
  var table = '<table><tr><th>#</th><th>Name</th><th>' + th_faction[lang] + '</th><th>' + th_class[lang] + '</th><th>' + th_progress[lang] + '</th>';
  
  if(editMode == "true")
  {
    table += '<th>' + th_remove[lang] + '</th>';
  }
  table += '</tr>';
  */
  
  var table = generateTableHeadline();
  
  var firstFaction = orderFaction;
  var secondFaction = getOtherFaction(orderFaction);
  
  //console.log("first faction: "+firstFaction);
  //console.log("second faction: "+secondFaction);
  
  table += getCharTableRows(firstFaction);
  
  table += getCharTableRows(secondFaction);  
  
  table += '</table>'; 

  $( "#tableAnchor1" ).append(table);
}

function generateTableHeadline()
{
  var editMode = localStorage.getItem(edit_mode_key);
  var lang = localStorage.getItem(lang_key);
  
  var table = '<table><tr><th>#</th><th>Name</th><th>' + th_faction[lang] + '</th><th>' + th_class[lang] + '</th><th>' + th_progress[lang] + '</th>';
  
  if(editMode == "true")
  {
    table += '<th>' + th_remove[lang] + '</th>';
  }
  table += '</tr>';

  return table;
}

function getCharTableRows(faction)
{
  var rows = "";
  var editMode = localStorage.getItem(edit_mode_key);
  var lang = localStorage.getItem(lang_key);
  
  // add rows with char-data
  var charFactionPrefix = prefix_charlist + faction;
  
  Object.keys(localStorage).sort().forEach(function(key) {
    //console.log(localStorage.getItem(key));
    if(key.startsWith(charFactionPrefix))
    {
        var nextItem = JSON.parse(localStorage.getItem(key));
        
        var progressImg = "undone.png";
        if(nextItem.progress_done == "true")
        {
          progressImg = "done.png";
        }
        
        //var nextTableRow = '<tr><td>' + nextItem.number + '</td><td>' + nextItem.name + '</td><td class="td' + nextItem.faction + '">' + nextItem.faction + '</td><td>' + nextItem.class + '</td><td onclick="toggleProgress(\'' + nextItem.id + '\');">' + nextItem.progress_done + '</td>';
        //var nextTableRow = '<tr><td>' + nextItem.number + '</td><td>' + nextItem.name + '</td><td><img src="' + nextItem.faction + '.png"></td><td>' + nextItem.class + '</td><td onclick="toggleProgress(\'' + nextItem.id + '\');">' + nextItem.progress_done + '</td>';
        //var nextTableRow = '<tr><td>' + nextItem.number + '</td><td>' + nextItem.name + '</td><td><img class="faction" src="' + nextItem.faction + '.png"></td><td>' + nextItem.class + '</td><td onclick="toggleProgress(\'' + nextItem.id + '\');"><img class="progress" src="' + progressImg + '"></td>';
        var nextTableRow = '<tr><td>' + nextItem.number + '</td><td>' + nextItem.name + '</td><td><img class="faction" src="' + nextItem.faction + '.png"></td><td>' + classNames[nextItem.class][lang] + '</td><td onclick="toggleProgress(\'' + nextItem.id + '\');"><img class="progress" src="' + progressImg + '"></td>';
        
        if(editMode == "true")
        {
          nextTableRow += '<td onclick="remove(\''+nextItem.id+'\')"><img class="trash" src="trash.png"></td>';
        }
        
        nextTableRow += '</tr>';
         
        rows += nextTableRow;
      }
    });
  return rows;
}

function reset() {
    resetProgressForAllChars();
    generateHtmlTableFromStorage();
}

function resetProgressForAllChars() {
// set progress_done of all chars to false

  Object.keys(localStorage).sort().forEach(function(key) {
    if(key.startsWith(prefix_charlist))
    {
        var nextItem = JSON.parse(localStorage.getItem(key));
        nextItem.progress_done = "false";
        localStorage.setItem(key, JSON.stringify(nextItem));
    }
  });
}

function clear() {
  localStorage.clear();
}

function toggleLang()
{
  // toggle lang_key Value in local storage between "en" and "de"
  var langVal = localStorage.getItem(lang_key);
  var newLang = "de";
  if(langVal == "de")
  {
    newLang = "en";
    
  }
  else if(langVal == "en")
  {
    newLang = "de";
  }
  localStorage.setItem(lang_key, newLang);
  
  setLangClassToBody();
  generateHtmlTableFromStorage();  
}

function toggleDivideTable()
{
  var divideVal = localStorage.getItem(divide_faction_tabeles_key);
  if(divideVal == "false")
  {  
    localStorage.setItem(divide_faction_tabeles_key, "true");
  }
  else
  {
    localStorage.setItem(divide_faction_tabeles_key, "false");
  }
  
  generateHtmlTableFromStorage();
}

function toggleFactionOrder()
{
  var orderVal = localStorage.getItem(faction_order_key);
  if(orderVal == "imp")
  {  
    localStorage.setItem(faction_order_key, "rep");
  }
  else
  {
    localStorage.setItem(faction_order_key, "imp");
  }
  
  generateHtmlTableFromStorage();
}

function toggleEditMode()
{
  var divideVal = localStorage.getItem(edit_mode_key);
  if(divideVal == "false")
  {  
    localStorage.setItem(edit_mode_key, "true");
  }
  else
  {
    localStorage.setItem(edit_mode_key, "false");
  }
  
  generateHtmlTableFromStorage();
}

function disableFormSubmit()
{
  $("form").submit(function(e){
    e.preventDefault(e);
    addNewChar();
  });
}

function addChangeEventToFactionSelect()
{
  $('input[type=radio][name=faction]').change(function() {
    $( "#imp-classes" ).toggleClass( "hide" );
    $( "#rep-classes" ).toggleClass( "hide" );

    //uncheck class selection when changing factions choice, this prevents choosing a class from the wrong faction
    $('input:radio[name=class]').prop('checked', false);
  });
}

function toggleAddChar()
{
  translateAddCharOverlay();
  $( "#blockui" ).toggleClass( "hide" );
  $( "#newCharOverlay" ).toggleClass( "hide" );
}

function toggleSettings()
{
  translateSettingsOverlay();
  $( "#blockui" ).toggleClass( "hide" );
  $( "#settingsOverlay" ).toggleClass( "hide" );
}

function getCharFromStorage(id)
{
  return localStorage.getItem(id);
}

function findFirstUnusedCharIdForFaction(faction)
{
  var currentId = 1;
  var maxId = 99;
  
  while (currentId <= maxId)
  {
    //console.log(currentId);
    
    var nextKey = transformIdToCharlistKey(faction, currentId)
    //console.log(nextKey);    
    
    var currentChar = localStorage.getItem(nextKey);
    //console.log(currentChar);    
    
    if (typeof currentChar == 'undefined' || currentChar == null)
    {
      break;
    }
 
    currentId++;
  }
  
  //console.log("kleinste freie Id für "+faction+": "+currentId);
  return currentId;
}

function transformIdToCharlistKey(faction, id)
{
  if(id < 10)
  {
    id = "0" + id;
  }

  return prefix_charlist + faction + '_' + id;
}

function saveNewCharToLocalStorage(id, number, charName, faction, charClass)
{
  var newChar = {"id":id, "number":number, "name":charName, "faction":faction, "class":charClass, "progress_done":"false"};
  localStorage.setItem(id, JSON.stringify(newChar));  
  //console.log("save new char done");
}

function getOtherFaction(faction)
{
  if (faction == "imp")
  {
    return "rep";
  } else if (faction== "rep")
  {
    return "imp";
  }
}

function setLangClassToBody()
{
  var lang = localStorage.getItem(lang_key);
  $( "#razct_body" ).removeClass();
  $( "#razct_body" ).addClass(lang);  
}

function translateAddCharOverlay()
{
  var lang = localStorage.getItem(lang_key);

  $( "#newCharTitle" ).text(newCharTitle[lang]);
  $( "#factionTitle" ).text(th_faction[lang]);
  $( "#faction_imp" ).text(faction_imp[lang]);
  $( "#faction_rep" ).text(faction_rep[lang]);
  $( "#classTitle" ).text(th_class[lang]);
  
  // translate class labels
  $( "#imp-classes > label" ).each(function() {
    console.log(this.attributes.for.value);
    $(this).text(classNames[this.attributes.for.value][lang]);
  });

  $( "#rep-classes > label" ).each(function() {
    console.log(this.attributes.for.value);
    $(this).text(classNames[this.attributes.for.value][lang]);
  });
  
  $( "#saveButton" ).val(save[lang]);
  $( "#cancelButton" ).val(cancel[lang]);
}

function translateSettingsOverlay()
{
  var lang = localStorage.getItem(lang_key);

  $( "#settingsTitle" ).text(settingsTitle[lang]);
  $( "#editModeTitle" ).text(editModeTitle[lang]);
  $( "#editModeText" ).text(editModeText[lang]);
  $( "#divideModeTitle" ).text(divideModeTitle[lang]);
  $( "#divideModeText" ).text(divideModeText[lang]);
  $( "#factionOrderTitle" ).text(factionOrderTitle[lang]);
  $( "#factionOrderText" ).text(factionOrderText[lang]);
  
  $( "#closeSettingsButton" ).val(closeButton[lang]);
}