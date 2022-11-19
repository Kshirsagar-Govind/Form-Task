Create a Form builder application
•	/ - Displays all the forms with the title
•	/form/create -> User should be able to create a form
•	/form/id/edit -> User should be able to edit the form
•	/form/id -> User can view the form
Create Form:
1.	Need to provide a create Form Button in the home screen that navigates to create page
2.	An empty form needs to be displayed
3.	It should allow to edit the Title of the Form.
4.	You need to provide an interface of your liking to allow the user to add different type of inputs to form.
5.	Input types that has to be supported - Email, Text, Password, Number, date
6.	You also need to ask the additional parameters for the input like title of the input, placeholder while selecting the type of the input
7.	Upon selecting the input type, input with the title has to be added onto the Form.
8.	Form has to display the inputs in (n rows x 2 columns) manner
9.	Inputs should display in read only mode
10.	Should allow maximum of 20 inputs
11.	Should allow deleting the input from the form
12.	Should provide a button to save the form in the Database
Edit From:
1.	Should be able to edit the previously created form.
View Form:
1.	User should be able to view the entire form with the exact same structure that was displayed during creation.
2.	Should allow user to enter data into the inputs. All the type validations must work
3.	A submit button must be provided which allows user to submit the form
4.	Storing the responses from the form is optional
Bonus -
1.	Can provide an option to arrange the inputs in the form while creating and editing the form using drag and drop
2.	Can provide an option to group inputs into sections
Technologies:
Frontend - Reactjs (Not allowed to use any third party library except for Drag and Drop)
Design - anything of your choice
Backend - Sailsjs/Expressjs
Database - Mongodb

