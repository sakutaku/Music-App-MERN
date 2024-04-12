# Music App
This is a Music App, where you can create artists, albums and their tracks. The app is divided into admin and client sides. To enter admin side, you have to login as admin (login: admin, password: 1qaz@WSX22). As admin you are able to publicate artists, albums and tracks, which were added by users. Also, you can delete them.

The client panel displays all publicated artists. When you click to an artist you can see all artist's albums, then by clicking to a specific album you go to all tracks of this album. Finally, when you click to the track, this track goes to your track history and modal with YouTube video opens.

The code is divided into backend and frontend parts. Backend is made on Express, MongoDb, using middlewares to control user permissions. Frontend id made using ReactJs.

To start the project, you need to do the following:

1) Clone the project to your Github machine with the command:
   
   `git clone git@github.com:sakutaku/Pizza-Ordering-App.git`
   
2) Open project in the terminal an go to backend folder and write following commands:
   `npm i && npm run seed`
   and
   `npm run dev`
3) Open frontend foler and write following command:

   `npm i && npm run start`
