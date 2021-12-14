
## Simple Authenthication App

[https://simple-authenthication-app.vercel.app/](https://simple-authenthication-app.vercel.app/)

## Site problems:
- `getSession` not work in serverSideProps or api:
- So then when you log in the site, you can note see the profile page Because of rout protection
- And You can manipulate the code to see the profile page, but due to the problem mentioned in the first line, it is not possible to change the password on this page and you will receive an error.

## Profile page:

![Untitled 2](https://user-images.githubusercontent.com/92398723/146036058-7d0682b2-30b9-48b9-84c3-05289590ce51.png)

## Login page:


![Untitled 3](https://user-images.githubusercontent.com/92398723/146036183-4542eaf1-f0e4-4d89-b315-d3fa75976ac9.png)

## For solve the problems:
- I searched a lot about `getSession` and I realized that it is a bug. I tried to fix the problem with version 3 next auth but failed.

## Tools used:
- Nextjs
- React
- Bcryptjs
- Mongodb
- Next auth v3

