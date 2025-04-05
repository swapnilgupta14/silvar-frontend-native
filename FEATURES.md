# Movie App Features

## 1. Movie Discovery & Info Hub

The IMDb-style heart of the app, but with personality and community baked in.

### Core Functionality

- Search & browse movies and TV shows
- View trailers, cast, crew, reviews, trivia
- Add to personal lists (Watchlist, Watched, etc.)
- See where to stream (future integration)

### How It Works

- Pulls from TMDb or IMDb APIs
- Includes custom user-generated tags and ratings
- Each movie page has:
  - Official content (trailer, synopsis, runtime, genres)
  - Stats (avg rating, popularity, number of user watches)
  - Discussion thread (Reddit-style)
  - Related movie links (e.g. "Fans Also Watched")

### UX/UI Notes

- Movie posters front-and-center
- Big action buttons: "Add to Watchlist," "Mark as Watched," "Add to Favorites," "Review"
- Scrollable cast with quick tap to see actor filmographies

## 2. User Lists & Journaling

Custom and curated lists are the lifeblood of any movie lover.

### Core Functionality

#### Default Lists

- 📌 Watchlist
- ✅ Watched
- ❤️ Favorites

#### Custom Lists

- Public or private
- Custom cover + description
- Sortable, shareable
- Journal entries: log when and how you felt about a movie

### How It Works

- Easy "+ Add to List" button on every movie page
- Users can create and edit custom lists with:
  - Tags (for searchability)
  - Mood/emotion filters
  - Themes (e.g. "Weird but Amazing")
- Journal can be private or shared
- Rewatch entries allowed — tracked over time

### UX/UI Notes

- Option for "Mini Review" (one-line hot takes)
- Beautiful list thumbnails w/ posters
- Rating, date watched, quick tags, and emoji reactions

## 3. Community & Groups (No DMs yet)

The Reddit side of the app — where cinephiles vibe.

### Core Functionality

- Public & private groups
- Topic boards (e.g. "Horror Talk," "Director Deep Dives")
- Comment threads & polls
- Post types: Discussion, Meme, Review, Question, Recommendation

### How It Works

Users can join/create groups with:

- Description, icon, themes
- Moderators & rules
- Movie-specific posts also show in related movie page
- Post upvoting, flagging, pinning

### UX/UI Notes

- Reddit-style vertical layout
- Flair for different post types
- Movie mentions auto-link to the title page

## 4. XP & Ranking System

Clever, taste-based XP — no grindy stuff.

### Core Functionality

- XP = IMDb rating of movie × weight factor (e.g. long runtime = higher reward)
- Accumulates into rank tiers (e.g. CineChild -> CineFan → CineBuff → CineGod)
- Leaderboards for friends & groups

### How It Works

- When a user marks a movie as "Watched," backend checks its IMDb rating
- XP = IMDb rating × multiplier (e.g. 10-star movie = 100 XP)

### Possible Future Modifiers

- First to watch in your group = bonus XP
- Watching obscure titles = +points

### Extras/Future Ideas

- XP Milestones unlock visual badges or UI flair
- "Flex" your top genres or total watch-time on profile

### UX/UI Notes

- XP animation when marking something as watched
- Simple XP bar in profile
- Group leaderboard with toggleable filters (genre, era, etc.)

## 5. Mystery Box Roulette

"Surprise me with something I'll probably love — or hate in a good way."

### How It Works

- User taps the Mystery Box icon
- Optional filters:
  - Genre(s)
  - Runtime
  - Language
  - Era/decade
  - Streaming platforms available

### Logic

- Uses a taste-weighted randomizer
- Movies with high match % (based on user's watch history, ratings, favorite genres, directors)
- Occasionally throws in a wild card — something outside your norm to keep things spicy 🌶️

### UX Features

- Animates like a slot machine with posters spinning
- Sound cue for dramatic reveal
- "Why this pick?" button explains the logic
- Quick actions: Add to Watchlist, Mark as Watched, Reject & Try Again

## 6. Mood Picker

"I feel like crying / laughing / questioning existence…"

### Mood Options

- Chill
- Nostalgic
- Heartbroken
- Existential
- Hyped
- Cozy
- Adventurous
- Artsy
- "Just want vibes"

### Behind the Scenes

- Each movie tagged with emotional themes (based on metadata, ML, or crowdsourced tagging)
- Mood + user taste = customized results
- Can combine with genre or decade

### UX Features

- Animated mood icons (e.g. a cozy blanket, fire, storm cloud)
- Recommends 1-3 top picks per mood
- Option to add moods to diary entries or list filters

## 7. CinePal Algorithm

"Your movie soulmate(s) are out there."

### How It Works

Finds users with highest overlap in:

- Rated movies
- List types (favorites, rewatched, custom lists)
- Review style / sentiments
- Tracks taste evolution over time (so it's always updating)

### Features

- Top CinePals shown on your profile
- Compare stats visually:
  - Watch history overlap
  - Genre affinity graphs
  - "Movies they loved that you haven't seen yet"
- Can send each other rec lists or co-create lists
- Weekly "CinePal Picks" carousel

## 8. Feature - API Source

- Movie data (titles, posters, genres) TMDb ✅
- IMDb + RT ratings OMDb ✅ (combine with TMDb)
- Streaming platforms JustWatch (unofficial)
- Trailers TMDb → YouTube links
- You can combine TMDb + OMDb using the IMDb ID
- User ratings, XP, lists, etc. own backend & db
