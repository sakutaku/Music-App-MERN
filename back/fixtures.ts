import mongoose from "mongoose";
import config from "./config";
import User from "./modeles/User";
import Artist from "./modeles/Artist";
import Album from "./modeles/Album";
import Track from "./modeles/Track";
import TrackHistory from "./modeles/TrackHistory";
import * as crypto from "crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('trackhistories');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user1, admin] = await User.create(
        {
            username: 'user_1',
            password: '1qaz@WSX22',
            token: crypto.randomUUID(),
            role: 'user'
        },
        {
            username: 'admin',
            password: '1qaz@WSX22',
            token: crypto.randomUUID(),
            role: 'user'
        },
    );

    const [Beyonce, Shakira] = await Artist.create(
        { title: 'Beyonce', description: 'She is a diva', image: 'fixtures/beyonce.png' },
        { title: 'Shakira', description: 'Best dancer ever', image: 'fixtures/shakira.png' }
    );

    const [
        Renaissance,
        Lemonade,
        SheWolf,
        ShakiraAlbum,
    ] = await Album.create(
        {artist: Beyonce._id, title: 'Renaissance', year: 2022, image: 'fixtures/renaissance.png'},
        {artist: Beyonce._id, title: 'Lemonade', year: 2016, image: 'fixtures/lemonade.png'},
        {artist: Shakira._id, title: 'SheWolf', year: 2009, image: 'fixtures/she_wolf.png'},
        {artist: Shakira._id, title: 'ShakiraAlbum', year: 2014, image: 'fixtures/shakira_album.png'},
    );

    const [
        Girl,
        Cozy,
        Alien,
        Cuff,
        Energy,
        Pray,
        Hold,
        Hurt,
        Sorry,
        Inch,
        Wolf,
        Again,
        Long,
        Why,
        Stuff,
        Remember,
        Empire,
        Care,
        Dare,
        Deep
    ] = await Track.create(
        {album: Renaissance._id, title: "I'm That Girl", number: 1, duration: '3:28', link: 'b2xLsCo8zmQ'},
        {album: Renaissance._id, title: 'Cozy', number: 2, duration: '3:30', link: '81j9gt1rXuk'},
        {album: Renaissance._id, title: 'Alien Superstar', number: 3, duration: '3:35', link: 'e_aT9pAGQo8'},
        {album: Renaissance._id, title: 'Cuff It', number: 4, duration: '3:45', link: 'SjqmSPZhF3s'},
        {album: Renaissance._id, title: 'Energy', number: 5, duration: '1:56', link: 'Y5rMHMUxMow'},

        {album: Lemonade._id, title: "Pray You Catch me", number: 1, duration: '3:16', link: '3cZFSooQQ8I'},
        {album: Lemonade._id, title: 'Hold Up', number: 2, duration: '3:41', link: 'PeonBmeFR8o'},
        {album: Lemonade._id, title: "Don't Hurt Yourself", number: 3, duration: '3:53', link: '10pOVWHrWck'},
        {album: Lemonade._id, title: 'Sorry', number: 4, duration: '3:52', link: 'QxsmWxxouIM'},
        {album: Lemonade._id, title: '6 Inch', number: 5, duration: '4:20', link: 'uGN5_8wCeZs'},

        {album: SheWolf._id, title: 'She Wolf', number: 1, duration: '3:10', link: 'booKP974B0k'},
        {album: SheWolf._id, title: 'Did it Again', number: 2, duration: '3:13', link: 'igcsNG4aruA'},
        {album: SheWolf._id, title: 'Long Time', number: 3, duration: '2:56', link: 'VIvxy-kfQkE'},
        {album: SheWolf._id, title: 'Why Wait', number: 4, duration: '2:43', link: 'UVKhNOl_Ss8'},
        {album: SheWolf._id, title: 'Good Stuff', number: 5, duration: '3:18', link: 'JspFp0GD7mI'},

        {album: ShakiraAlbum._id, title: "Can't Remember to Forget You", number: 1, duration: '3:26', link: 'o3mP3mJDL2k'},
        {album: ShakiraAlbum._id, title: 'Empire', number: 2, duration: '4:03', link: 'QapfTGTXbxc'},
        {album: ShakiraAlbum._id, title: "You Don't Care About Me", number: 3, duration: '3:42', link: 'iqmGLBnAMeQ'},
        {album: ShakiraAlbum._id, title: 'Dare', number: 4, duration: '3:08', link: 'XkYAxGt-aUs'},
        {album: ShakiraAlbum._id, title: 'Cut me Deep', number: 5, duration: '3:15', link: '9lfwgbb90MQ'},
    );

    await TrackHistory.create(
        {user: user1, track: Girl._id, datetime: '20-07-2022'},
        {user: user1, track: Cozy._id, datetime: '20-07-2022'},
        {user: user1, track: Alien._id, datetime: '20-07-2022'},
        {user: user1, track: Cuff._id, datetime: '20-07-2022'},
        {user: user1, track: Energy._id, datetime: '20-07-2022'},
        {user: user1, track: Pray._id, datetime: '20-07-2022'},
        {user: user1, track: Hold._id, datetime: '20-07-2022'},
        {user: user1, track: Hurt._id, datetime: '20-07-2022'},
        {user: user1, track: Sorry._id, datetime: '20-07-2022'},
        {user: user1, track: Inch._id, datetime: '20-08-2022'},
        {user: user1, track: Again._id, datetime: '20-08-2022'},
        {user: user1, track: Why._id, datetime: '20-08-2022'},
        {user: user1, track: Dare._id, datetime: '26-07-2022'},
        {user: admin, track: Care._id, datetime: '30-07-2022'},
        {user: admin, track: Wolf._id, datetime: '01-07-2022'},
        {user: user1, track: Stuff._id, datetime: '20-08-2022'},
        {user: user1, track: Remember._id, datetime: '20-08-2022'},
        {user: admin, track: Long._id, datetime: '01-07-2022'},
        {user: user1, track: Empire._id, datetime: '20-08-2022'},
        {user: user1, track: Deep._id, datetime: '20-08-2022'},
    );

    await db.close();
};

run().catch(console.error);