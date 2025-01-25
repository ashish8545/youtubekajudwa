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