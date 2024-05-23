# Architecture
- Whole Application is built using Next.js (App Router). And only the required components are client rendered, rest of the parts are server rendered
- One of the most important piece of the app (Video Player) is implemented using a package called Next Video
- The home page it self is server rendered, so the initial data in fetched at server. And once we add more videos, we revalidate the home path to clear the cache and bring on the new data
- Since it is a small app, we have added all UI components inside the UI folder and all the user inputs are shown as dialogs. However, we still have option to break the app down in dynamic routes and slugs.
- For CSS and UI Elements, we have used Shadcn Library and Tailwind, as they work well with each other

# Features
- See list of videos and player it then and there
- if we need more controls, then we can full screen and we have speed, skip, picture-in-picture options
- We can add more videos by providing direct .mp4 links (For testing : http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)
- Lastly, we can open the comments. Read others comments and comment our thoughts too

# Run it locally
- Clone the repo to local environment. Open terminal at the cloned folder. Type "npm run dev" in the terminal and hit Enter. The app will be running on port choosed by your dev environment

# Screenshots
![Full Width](/Screenshots/LearnwellFullPage.jpeg)
![Full Width](/Screenshots/Learnwell.jpeg)