## DandLY is a file storage system clone built using NextTS, Tailwind CSS, Convex backend and Clerk for authentication and User Management.
## Software Development Life Cycle
The methodology for this project is a combination of Agile and waterfall. Agile in the development of the web portion of the system because of flexibility and waterfall for the development of the encryption module because of rigidity.
![image](https://github.com/user-attachments/assets/564ed399-b1b3-4bc7-89f2-99450a0e946e)

## System Requirements
The system requirements are divided into two: Hardware and software requirements.
Hardware Requirements
•	Intel Core I3 
•	2.5GHz
•	8Gb RAM
•	100GB HDD space

## Software Requirements
•	Windows 10
•	Ubuntu 18.3
•	Mac OS x
•	Fedora 9.0
•	RedHat 8
•	Centos 7

## System Architecture
This project uses a monolithic application structure, in which all parts of an app were written and deployed together - frontend, backend + database. Separate modules are where each of the functionalities is carried out within this monolithic structure. Frontend is built on Next.js and produces an orchestrated user interface. Back-end uses Convex that takes care of the application logic as well as putting interactions with database. The ecosystem utilizes Clerk for strong authentication and authorization making it a very secure access control system. Even though a monolith - is distributed because it will be expected to span multiple servers or services.
This distributed approach enhances the application’s ability to handle higher loads and improve performance while maintaining the simplicity and coherence of a single, unified application.
![image](https://github.com/user-attachments/assets/aceb38d3-7830-42fb-9274-968ddc6976e2)

## Implementation Results
### The User Interface
The pages of the user interface are divided into the following:
•	Landing Page
•	Register Page
•	Dashboard
#### Landing Page
The landing page of the application is built using next Js, tailwind CSS, shadcn and lucide. Next Js is used to display the user interface and interactivity of the application. Because of the properties of next like server-side rendering, speed, parallel fetching and folder routing, this framework is employed. Tailwind is used for adding the styling, looks and feel of the application. Shadcn and lucide helps to also support tailwind with the looks of the application.
![image](https://github.com/user-attachments/assets/7a8532ab-72e1-45fe-90c5-7c735149748b)

#### Register page
This page is built using clerk. Clerk automatically provides authentication and register modal.
![image](https://github.com/user-attachments/assets/2af5b60a-3f73-4396-bbd1-77a2032e1579)

#### Dashboard
The dashboard was built using Next Js and clerk. It has so many features like file upload, file restore, and display favorite files. In the dashboard, users can switch between personal accounts and organizations. The application utilizes RBAC (Role based access control) that helps only authorized users perform CRUD (Create Read Update and Delete) processes.
![image](https://github.com/user-attachments/assets/636db32f-e20c-4722-8ed1-3c4afe38c096)



