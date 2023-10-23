# THREAD - A COMMUNITY DISCUSSION APPLICATION

**Thread** is a web application that empowers users to engage in meaningful discussions, share their views on diverse topics, and build communities around shared interests. Built with Next.js 13 and TypeScript, Thread offers an interactive and dynamic platform for discussions and idea exchange.

## FEATURES

- **CREATE THREADS:** Users can create threads to share their thoughts on a wide range of topics.
- **COMMUNITY BUILDING:** Establish and manage your own communities based on specific themes or interests.
- **COMMENTS AND REPLIES:** Engage in insightful discussions by adding comments and replies to threads.
- **NOTIFICATION CENTER:** Stay informed about new comments, replies, and activities on your threads.

## USER AUTHENTICATION WITH CLERK

Thread leverages [Clerk](https://clerk.dev/) for user sign-in and sign-up functionality, providing a secure and convenient authentication process. With Clerk, users can authenticate using various platforms, including Google, GitHub, and more.

### ROLE MANAGEMENT IN COMMUNITIES

Within **Thread**, community owners have the ability to manage roles for community members. This role management system allows for the distinction between community members and administrators, granting varying levels of control and responsibilities.

- **COMMUNITY MEMBERS:** Regular members can participate in discussions and engage in community activities.
- **COMMUNITY ADMINISTRATORS:** Administrators have additional privileges, such as managing community settings, moderating discussions, and controlling access.

### GETTING STARTED

1. **SIGN UP:** Create an account with Clerk, and enjoy a seamless and secure sign-up experience.
2. **SIGN IN:** Use your Clerk credentials or sign in with your Google or GitHub account to access the application.

## USAGE

**Thread** is designed to be user-friendly and straightforward to use:

1. **SIGN UP:** Create an account or log in to start using the application.
2. **EXPLORE THREADS:** Discover a variety of threads on different topics.
3. **ENGAGE IN DISCUSSIONS:** Join existing discussions by adding comments and replies to threads.
4. **CREATE YOUR COMMUNITY:** Establish your own communities around unique interests.

Community administrators can use role management to effectively organize and administer their communities.

## MEDIA STORAGE WITH UPLOADTHING

We use "UploadThing," an S3-powered storage platform authorized by GitHub, to store media related to users, ensuring secure and reliable storage for user-generated content.

## API ENDPOINTS

Here are some of the API endpoints used in **Thread**:

| API Endpoint         | Description                                             |
|----------------------|---------------------------------------------------------|
| `/api/uploadthing`   | Upload user images with middleware authorization         |
| `/api/webhook/clerk` | Capture webhook events to sync data in the backend      |

## CONTRIBUTING

We welcome contributions from the community. If you'd like to contribute to this project, please follow these guidelines:

### HOW TO CONTRIBUTE

1. Fork the repository and create your branch from `main`.

2. Clone the forked repository to your local machine.

3. Make your changes and ensure the code is well-documented and follows our coding style.

4. Test your changes thoroughly to ensure they do not introduce new issues.

5. Submit a pull request to the `main` branch of this repository, describing your changes and their purpose.

### CODE STYLE

Please follow the existing code style used in the project. Make sure your code is properly formatted and adheres to best practices.

### TESTING

Include unit tests or end-to-end tests if applicable to cover your changes.

### DOCUMENTATION

If you add or modify features, update the project's documentation, including the README.

## LIVE LINK

You can access the live version of **Thread** [here](https://your-live-link.com).

## LICENSE

This project is open-source and available under the [MIT License](LICENSE). You are welcome to use, modify, and distribute it.

## ACKNOWLEDGMENTS

We would like to express our gratitude to the open-source community for their valuable contributions and support. Additionally, we thank our users for making **Thread** a dynamic platform for discussions and idea sharing.
