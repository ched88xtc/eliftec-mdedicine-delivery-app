# Eliftech Medicine Delivery app
## Project link
You can check this project by following the link - [Project link](https://eliftec-mdedicine-delivery-app-frontend.vercel.app/)

## How to start
To run the project locally, follow these steps:

**Clone the project:** Copy the project from the repository using the following command in your terminal or command prompt:

    bash
    git clone <repository_url>

2. **Create MongoDB database:** Set up a MongoDB database and obtain the connection string. Make sure to replace `<YOUR_CONNECTION_STRING>` with the actual connection string you obtained.

3. **Update Backend configuration:**
    - Navigate to the "Backend" folder.
    - Open the `index.js` file.
    - Locate the line with `mongoose.connect(<YOUR_CONNECTION_STRING>)`.
    - Replace `<YOUR_CONNECTION_STRING>` with your MongoDB connection string.

4. **Run Backend server:**
    - In the "Backend" folder, run the following command:

    ```bash
    npm run start:dev
    ```

5. **Run Frontend development server:**
    - Navigate to the "frontend" folder.
    - Run the following command:

    ```bash
    npm run start
    ```
## Сomments
This project was developed as a test task for Eliftech. It utilizes the following technology stack.

**Database**: MongoDB

**Server**: Node.js, Express.js

**Client-side**: TypeScript, React, Redux Toolkit, MaterialUI, Yup

**_MongoDB_** was chosen for the sake of convenience and rapid development, as well as academic interest, within the scope of being a test project. For a similar task in a commercial project, I would opt for a relational database, providing more capabilities.

If there were no constraints on using any database or Node.js, I would have implemented this as a serverless application using Strapi. Strapi could cover all the functionality required by the task.

Adding items to the **_favorites list_** was implemented through the server and a database for complexity and to create at least one update route. This could have been done more straightforwardly through Local Storage. In general, such functionality requires authentication to create a client and add favorite items to their lavoritesItemsList.

**_MaterialUI_** was used to expedite development, eliminating the need to write custom components.
Styles were written using the style prop, as they were minimal, making it unnecessary to incorporate Tailwind or extract them into a separate .css file.

Basic validation has been added using **_React Hook Form_** and **_Yup_**.
