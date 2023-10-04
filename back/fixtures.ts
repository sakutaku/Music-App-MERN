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
            displayName: 'User',
            role: 'user'
        },
        {
            username: 'admin',
            password: '1qaz@WSX22',
            token: crypto.randomUUID(),
            displayName: 'Admin',
            role: 'admin'
        },
    );

    const [Beyonce, Shakira, Ciara] = await Artist.create(
        { title: 'Beyonce', description: 'She is a diva', image: 'fixtures/beyonce.png', user: user1._id, isPublished: false },
        { title: 'Shakira', description: 'Best dancer ever', image: 'fixtures/shakira.png', user: admin._id, isPublished: false },
        { title: 'Ciara', description: 'Old school girl', image: 'fixtures/ciara.jpeg', user: user1._id, isPublished: false },
    );

    const [
        Renaissance,
        Lemonade,
        SheWolf,
        ShakiraAlbum,
        Goddies,
        Evolution
    ] = await Album.create(
        {artist: Beyonce._id, title: 'Renaissance', year: 2022, image: 'fixtures/renaissance.png', user: user1._id, isPublished: false},
        {artist: Beyonce._id, title: 'Lemonade', year: 2016, image: 'fixtures/lemonade.png', user: user1._id, isPublished: false},
        {artist: Shakira._id, title: 'SheWolf', year: 2009, image: 'fixtures/she_wolf.png', user: user1._id, isPublished: false},
        {artist: Shakira._id, title: 'ShakiraAlbum', year: 2014, image: 'fixtures/shakira_album.png', user: admin._id, isPublished: false},
        {artist: Ciara._id, title: 'Goddies', year: 2004, image: 'fixtures/goodies.jpeg', user: admin._id, isPublished: false},
        {artist: Ciara._id, title: 'Evolution', year: 2006, image: 'fixtures/evolution.jpeg', user: admin._id, isPublished: false},
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
        Deep,
        GoddiesTrack,
        Step,
        Thug,
        Hotline,
        Oh,
        Right,
        Boy,
        Promise,
        Proceed,
        Alone

    ] = await Track.create(
        {album: Renaissance._id, title: "I'm That Girl", number: 1, duration: '3:28', link: 'b2xLsCo8zmQ', user: admin._id, isPublished: false},
        {album: Renaissance._id, title: 'Cozy', number: 2, duration: '3:30', link: '81j9gt1rXuk', user: admin._id, isPublished: false},
        {album: Renaissance._id, title: 'Alien Superstar', number: 3, duration: '3:35', link: 'e_aT9pAGQo8', user: admin._id, isPublished: false},
        {album: Renaissance._id, title: 'Cuff It', number: 4, duration: '3:45', link: 'SjqmSPZhF3s', user: admin._id, isPublished: false},
        {album: Renaissance._id, title: 'Energy', number: 5, duration: '1:56', link: 'Y5rMHMUxMow', user: admin._id, isPublished: false},

        {album: Lemonade._id, title: "Pray You Catch me", number: 1, duration: '3:16', link: '3cZFSooQQ8I', user: user1._id, isPublished: false},
        {album: Lemonade._id, title: 'Hold Up', number: 2, duration: '3:41', link: 'PeonBmeFR8o', user: user1._id, isPublished: false},
        {album: Lemonade._id, title: "Don't Hurt Yourself", number: 3, duration: '3:53', link: '10pOVWHrWck', user: user1._id, isPublished: false},
        {album: Lemonade._id, title: 'Sorry', number: 4, duration: '3:52', link: 'QxsmWxxouIM', user: user1._id, isPublished: false},
        {album: Lemonade._id, title: '6 Inch', number: 5, duration: '4:20', link: 'uGN5_8wCeZs', user: user1._id, isPublished: false},

        {album: SheWolf._id, title: 'She Wolf', number: 1, duration: '3:10', link: 'booKP974B0k', user: admin._id, isPublished: false},
        {album: SheWolf._id, title: 'Did it Again', number: 2, duration: '3:13', link: 'igcsNG4aruA', user: admin._id, isPublished: false},
        {album: SheWolf._id, title: 'Long Time', number: 3, duration: '2:56', link: 'VIvxy-kfQkE', user: admin._id, isPublished: false},
        {album: SheWolf._id, title: 'Why Wait', number: 4, duration: '2:43', link: 'UVKhNOl_Ss8', user: admin._id, isPublished: false},
        {album: SheWolf._id, title: 'Good Stuff', number: 5, duration: '3:18', link: 'JspFp0GD7mI', user: admin._id, isPublished: false},

        {album: ShakiraAlbum._id, title: "Can't Remember to Forget You", number: 1, duration: '3:26', link: 'o3mP3mJDL2k', user: user1._id, isPublished: false},
        {album: ShakiraAlbum._id, title: 'Empire', number: 2, duration: '4:03', link: 'QapfTGTXbxc', user: user1._id, isPublished: false},
        {album: ShakiraAlbum._id, title: "You Don't Care About Me", number: 3, duration: '3:42', link: 'iqmGLBnAMeQ', user: user1._id, isPublished: false},
        {album: ShakiraAlbum._id, title: 'Dare', number: 4, duration: '3:08', link: 'XkYAxGt-aUs', user: user1._id, isPublished: false},
        {album: ShakiraAlbum._id, title: 'Cut me Deep', number: 5, duration: '3:15', link: '9lfwgbb90MQ', user: user1._id, isPublished: false},

        {album: Goddies._id, title: "Goddies", number: 1, duration: '3:43', link: 'YtC92pzp5vw', user: admin._id, isPublished: false},
        {album: Goddies._id, title: "1, 2 Step", number: 2, duration: '3:23', link: 'iBHNgV6_znU', user: admin._id, isPublished: false},
        {album: Goddies._id, title: "Thug Style", number: 3, duration: '4:25', link: '4Gl-notGYFQ', user: admin._id, isPublished: false},
        {album: Goddies._id, title: 'Hotline', number: 4, duration: '3:23', link: 'eOwjERAbcws', user: admin._id, isPublished: false},
        {album: Goddies._id, title: 'Oh', number: 5, duration: '4:16', link: 'Hr4wz4-27PY', user: admin._id, isPublished: false},

        {album: Evolution._id, title: "That's Right", number: 1, duration: '4:16', link: 'vTVs5kO9NBw', user: user1._id, isPublished: false},
        {album: Evolution._id, title: "Like a Boy", number: 2, duration: '3:57', link: 'HKH7Emy1SY', user: user1._id, isPublished: false},
        {album: Evolution._id, title: 'Promise', number: 4, duration: '4:27', link: 'UcGWy7xUZQE', user: user1._id, isPublished: false},
        {album: Evolution._id, title: 'I Proceed', number: 5, duration: '4:13', link: 'lxml1f4WrPE', user: user1._id, isPublished: false},
        {album: Evolution._id, title: "Can't Leave 'em Alone", number: 5, duration: '4:04', link: 'EnL9Ju7oSvU', user: user1._id, isPublished: false},

    );

    await TrackHistory.create(
        {user: user1._id, track: Girl._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Cozy._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Alien._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Cuff._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Energy._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Pray._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Hold._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Hurt._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Sorry._id, datetime: '20-07-2022', artist: Beyonce._id},
        {user: user1._id, track: Inch._id, datetime: '20-08-2022', artist: Beyonce._id},
        {user: user1._id, track: Again._id, datetime: '20-08-2022', artist: Shakira._id},
        {user: user1._id, track: Why._id, datetime: '20-08-2022', artist: Shakira._id},
        {user: user1._id, track: Dare._id, datetime: '26-07-2022', artist: Shakira._id},
        {user: admin._id, track: Care._id, datetime: '30-07-2022', artist: Shakira._id},
        {user: admin._id, track: Wolf._id, datetime: '01-07-2022', artist: Shakira._id},
        {user: user1._id, track: Stuff._id, datetime: '20-08-2022', artist: Shakira._id},
        {user: user1._id, track: Remember._id, datetime: '20-08-2022', artist: Shakira._id},
        {user: admin._id, track: Long._id, datetime: '01-07-2022', artist: Shakira._id},
        {user: user1._id, track: Empire._id, datetime: '20-08-2022', artist: Shakira._id},
        {user: user1._id, track: Deep._id, datetime: '20-08-2022', artist: Shakira._id},

        {user: admin._id, track: GoddiesTrack._id, datetime: '22-09-2022', artist: Ciara._id},
        {user: user1._id, track: Step._id, datetime: '26-00-2022', artist: Ciara._id},
        {user: admin._id, track: Thug._id, datetime: '30-07-2022', artist: Ciara._id},
        {user: admin._id, track: Hotline._id, datetime: '01-07-2022', artist: Ciara._id},
        {user: user1._id, track: Oh._id, datetime: '20-08-2022', artist: Ciara._id},
        {user: user1._id, track: Right._id, datetime: '20-08-2022', artist: Ciara._id},
        {user: admin._id, track: Boy._id, datetime: '01-07-2022', artist: Ciara._id},
        {user: user1._id, track: Promise._id, datetime: '05-08-2022', artist: Ciara._id},
        {user: user1._id, track: Proceed._id, datetime: '14-09-2022', artist: Ciara._id},
        {user: admin._id, track: Alone._id, datetime: '16-09-2022', artist: Ciara._id},
    );
    await db.close();
};

run().catch(console.error);