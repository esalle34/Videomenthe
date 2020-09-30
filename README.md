Sujet du test : <br />

File Browser<br />

Your project will consist of a exposing a local filesystem under a REST API and make it browseable<br />
from a React website:<br />
1. The REST API should expose the content of a directory on the server filesystem (path should<br />
be configurable).<br />
It must have the following routes:<br />
• /browse - returns a list of files and directories for a given path.<br />
• /download - returns the file for a given path.<br />
• /upload - handles file uploads to a given path.<br />
• /remove - removes file at a given path.<br />
Paths coming from and to the REST API must always be relative to the configured directory.<br />
2. The React website should include one or more components which should connect to the<br />
REST API and:<br />
• Expose the directories and files as an icon view (as in Windows Explorer of Mac OS<br />
Finder).<br />
When an item is clicked:<br />
▪ if it’s a directory, then it should change the current directory to the one<br />
which has been clicked.<br />
▪ if it’s a file, then it should trigger a download.<br />
• Allow end-users to upload files to the current directory.<br />

You are free to increase the features, create the design, deploy the app, etc, but the use of<br />
JavaScript or TypeScript as main language is mandatory (choose the one you want; we won’t take it<br />
into consideration).<br />
You must at least write the code and a typical README.md describing your work and how to run it.<br />

------------------------------------------------------------------------------------------------<br />

Pour utiliser l'api :<br />

-Installer la dernière version de node.js stable.<br />
-Naviguer vers le dossier d'installation.<br />
-Lancer un invité de commande, puis tappez npm run build.<br />
-Ensuite, lancer npm run prod.<br />
-Naviguer vers http://localhost/browse<br />

Cordialement,<br />

Eric Salle
