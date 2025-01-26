# Youtube Clone APP

####    SETUP   ####
- Download & Install VsCode
- Download & Install Git
- Download & Install NodeJS

#### Create React APP ####
- git init
- npx create-react-app <folder_name>

#### Install Tailwind ####
- npm install -D tailwindcss
- npx tailwindcss init
- npm i -D tailwind-scrollbar (used for scrollbar attributes)

#### Install React Redux & Toolkit ####
npm i @reduxjs/toolkit
npm i react-redux

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
