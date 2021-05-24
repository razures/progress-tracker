//Json with all class names in english and german
var classNamesJson = `{
        "juggernaut": {"de":"Sith-Juggernaut", "en":"Sith Juggernaut"},
        "marauder": {"de":"Sith-Marodeur", "en":"Sith Marauder"},
        "assassin": {"de":"Sith-Attent\u00e4ter","en":"Sith Assassin"},
        "sorcerer": {"de":"Sith-Hexer", "en":"Sith Sorcerer"},
        "powertech": {"de":"Powertech", "en":"Powertech"},
        "mercenary": {"de":"S\u00f6ldner", "en":"Mercenary"},
        "operative" : {"de":"Saboteur", "en":"Operative"},
        "sniper" : {"de":"Scharfsch\u00fctze", "en":"Sniper"},
        "guardian" : {"de":"Jedi-H\u00fcter", "en":"Jedi Guardian"},
        "sentinel" : {"de":"Jedi-W\u00e4chter", "en":"Jedi Sentinel"},
        "sage" : {"de":"Jedi-Gelehrter", "en":"Jedi Sage"},
        "shadow" : {"de":"Jedi-Schatten", "en":"Jedi Shadow"},
        "gunslinger" : {"de":"Revolverheld", "en":"Gunslinger"},
        "scoundrel" : {"de":"Schurke", "en":"Scoundrel"},
        "commando" : {"de":"Kommando", "en":"Commando"},
        "vanguard" : {"de":"Frontk\u00e4mpfer", "en":"Vanguard"}
    }`;

var classNames = JSON.parse(classNamesJson); 

var th_faction = {"de":"Fraktion", "en":"Faction"};
var th_class = {"de":"Klasse", "en":"Class"};
var th_progress = {"de":"Erledigt", "en":"Progress done"};
var th_remove = {"de":"Entfernen", "en":"Remove"};

var newCharTitle = {"de":"Charakter hinzuf\u00fcgen", "en":"Add character"};
var faction_rep = {"de":"Galaktische Republik", "en":"The Galactic Republic"};
var faction_imp = {"de":"Sith-Imperium", "en":"The Sith Empire"};
var save = {"de":"Speichern", "en":"Save"};
var cancel = {"de":"Abbrechen", "en":"Cancel"};

var settingsTitle = {"de":"Einstellungen", "en":"Settings"}; 
var editModeTitle = {"de":"Bearbeitungsmodus", "en":"Edit Mode"};
var editModeText = {"de":"Bearbeitungsmodus \u00e4ndern", "en":"Change Edit Mode"};
var divideModeTitle = {"de":"Teilungsmodus", "en":"Divide Mode"};
var divideModeText = {"de":"Teilungsmodus \u00e4ndern", "en":"Change Divide Mode"};
var factionOrderTitle = {"de":"Frakionen Reihenfolge", "en":"Faction Order"};
var factionOrderText = {"de":"Frakionen Reihenfolge \u00e4ndern", "en":"Change Faction Order"};

var closeButton = {"de":"Schlie\u00dfen", "en":"Close"};