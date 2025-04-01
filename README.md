# Youtube Clone APP

#### Setup ####
- Download & Install VsCode
- Download & Install Git
- Download & Install NodeJS

#### Create React APP ####
- git init
- npx create-react-app <folder_name>
- Default Bundler: webpack

#### Install Tailwind ####
- npm install -D tailwindcss
- npx tailwindcss init
- npm i -D tailwind-scrollbar (used for scrollbar attributes)

#### Install React Redux & Toolkit ####
npm i @reduxjs/toolkit
npm i react-redux

#### Install React Router DOM ####
npm i react-router-dom

#### Planning Components ####
- Header
- Body
    - Sidebar
    - MainContainer
        - ButtonList
        - VideosContainer

#### Install React Icons ####
- npm install react-icons --save
- https://react-icons.github.io/react-icons/

#### Designing Header Component ####
- Styling Header Component
- Show/Hide inner search icon on text box focus and blur 
- Using grid css for header items

#### Designing Sidebar Component ####
- Styling Sidebar Component
- Using tailwind-scrollbar for making sidebar scrollbar thin and changing color
    - For this we need to install tailwind-scrollbar
    - import the plugin in tailwind.config.js
- Creating *common components* for side menu items and sign in button
- Using flex css for menu items
- Configure Redux Store
    - Create Store
        - configureStore from @reduxjs/toolkit
    - Connect Store to app
        - Provider from react-redux
    - Create Slice
        - createSlice from @reduxjs/toolkit
        - Mutate State
    - Dispatch action
    - Selector (Subscribe to store)

#### FIRST API CALL ####
- First API call to get video categories
- Adding API key to .env file and accessing via process.env.API_KEY
    - Ideally, sensitive data like keys and personal information must be stored in backend
    - For more secure architecture, have a backend configuration where we have the key and create an API that uses AUTH to get the key from backend
    - For this project, we will use .env instead of backend API
- React (using Create React App) enforces that all environment variables must start with the REACT_APP_ prefix
    - If prefix is not used, it will return the key as undefined.

#### Video Categories List ####
- Using video categories API to list buttons with category names
- Styling video categories button list
- Designing and making carousel functinal for button horizontal scroll
    - Hide previous icon initially
    - Show previous icon when scrolled to right
    - Hide next icon when scrolled to the end
    - *Using useRef() to target scrolling container*
- Adding tailwind custom class in tailwind.config.css for adding gradient to previous and next icons

#### Video Cards ####
- Styling video cards
- Adding and using new videos and channels API
- Helper functions
    - Convert UTC to Number of days ago
    - Convert number to 1K, 1M, 1B
- Conditional rendering of elements and css for live videos

#### Video Cards Lazy Loading ####
- Using IntersectionObserver
    - For observing the element placed at end of the page whether it is intersecting with parent element or viewport
- useCallback for memoizing function - getVideos() and getChannels()
- Adding Error Handling
- *New learning:* 
    - While setting a state it taks a value OR a callback function (with argument containing value of previous state)
    - Went into this problem which was mentioned in course and later remembered:
    - <React.StrictMode> in index.js creates problem of twice component rendering on dev envs but not in production (In DEV, React reconfirms if component is rendered by rendering it twice)

#### Filtering Videos By Video Category ####
- Uplifting the state to filter by category id and show / hide loader
- Adding transparent loader overlay on button list and videos (main container) and disabling click and scroll unless updated data is loaded

#### ROUTING ####
- Configuring routing

#### Search Suggestion API ####
- Styling the search suggestions
- Debouncing
    - Decline the previous API call if the search keystroke is less than 200ms
- Caching the API response into redux
    - Call API only when data is not found for search query in redux (cache)
    - Highlighted previously searched queries with history icon
    - Functionality to remove the highlight of previously searched queries

#### Firebase Setup ####
- Installing and integrating Google Firebase
    - npm install firebase (Add firebase SDK)
    - Copy configuration to firebase.js
    - npm install -g firebase-tools (Hosting)
    - firebase login (Sign in to Google)
    - firebase init (Initiate your project)
- Deploying the app to production
    - firebase deploy

#### User Authentication (Login/Signup) ####
- Configuring Google Auth with firebase (OAuth 2.0)
- Sign in functionality with popup - signInWithPopup()
- Sign out functionality - signOut()
- Observing and manager redux user data with onAuthStateChanged()

#### Sidebar Subscriptions API ####
- Integrating subscriptions API with bearer token (This API requires OAuth authorization token from google - received after login successfull)
- Showing the user's subscribed channels in sidebar, if the user is logged in

#### Search Results Page ####
- Implementing the search results page
- Using useNavigate() & useSearchParams() react router hooks to navigate and get the search params
- Caching the search results into redux
- Styling the results page

#### LRU - Least Recently Used ####
- Implemented LRU for redux cache to remove data after certain limit so that it doesn't bloats the redux store

#### Watch Page ####
- Styling the watch Page
- Dummy Like / Dislike selection with tailwind animation library
- Description Read more / Show less functionality 