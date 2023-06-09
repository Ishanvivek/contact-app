# contact-app

This is a simple Contact List app built using React Native. It allows you to view a list of contacts, search for specific contacts, view contact details, and add new contacts.

## Features

- View a list of contacts
- Search for contacts by name
- View contact details in a modal
- Add new contacts

## Getting Started

To get started with the Contact List app, follow these steps:

1. Clone the repository:git clone <repository-url>

2. Install the dependencies: cd contact-list-app npm install

3. Run the app: npm start
  
 
This will start the development server and launch the app in your default emulator or device.

## Usage

- The following app is a basic contact list application with the following features:

1. Contact Listing: The app displays a list of contacts. Each contact entry includes the name and phone number of the contact. The list is initially populated with some fake contacts and additional random Indian names and phone numbers.

2. Search Functionality: The app allows users to search for specific contacts by entering a search query in the search input field. The contacts list is dynamically filtered based on the search query, displaying only the contacts that match the search criteria.

3. Contact Details Modal: When a contact is tapped in the list, a modal is displayed showing the contact's name and phone number in a visually appealing layout. Users can close the modal by tapping the "Close" button.

4. Add Contact Modal: The app provides a functionality to add new contacts. Tapping the "+" button at the bottom-right corner of the screen opens a modal. Inside the modal, users can enter the name and phone number of the new contact. After entering the details, users can tap the "Create Contact" button to add the contact to the list. There is also a "Cancel" button to close the modal without creating a new contact.

5. Styling and Layout: The app utilizes various styles and layouts to provide a visually appealing user interface. The styles include container styles, header styles, input styles, contact item styles, modal styles, button styles, and more. These styles are defined using the StyleSheet API from React Native.

6. State Management: The app uses React hooks, specifically the `useState` hook, to manage the application state. It maintains state variables for the contacts list, filtered contacts list, search query, selected contact, add contact modal visibility, and new contact name and number inputs. The state is updated based on user interactions and data fetching.

7. useEffect Hook: The `useEffect` hook is used to fetch the initial contacts when the app is first rendered. It simulates the process of fetching contacts by setting some fake contacts and generating random Indian names and phone numbers. The `useEffect` hook is called only once when the component mounts.

These are the main features and functionalities present in the provided code for the contact list app.
  
## Customization

Feel free to customize the app according to your needs. You can modify the styles, add new functionality, or integrate with real APIs to fetch contacts.

The main component of the app is `App.js`, which contains the logic and rendering code. The styles are defined in the `styles` object in the same file. You can make changes to these files to customize the app's behavior and appearance.

## Certainly! Let's go through the code and provide a more detailed explanation of each section:


```jsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
```

In this section, we import the necessary components and hooks from the `react` and `react-native` libraries. These imports include components like `Text`, `View`, `TextInput`, `FlatList`, `TouchableOpacity`, `Modal`, and `TouchableWithoutFeedback`. We also import the `useState` and `useEffect` hooks from React, which are used for managing state and performing side effects in functional components.

```jsx
const App = () => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
```

Inside the functional component `App`, we define several state variables using the `useState` hook. These state variables are used to manage the application's data and UI state. For example, `contacts` and `filteredContacts` store the list of contacts, `searchQuery` stores the current search query, `selectedContact` represents the contact selected for detailed view, and `isAddModalVisible` tracks the visibility of the add contact modal. The variables `newContactName` and `newContactNumber` store the values entered in the add contact modal's input fields.

```jsx
  useEffect(() => {
    fetchContacts();
  }, []);
```

The `useEffect` hook is used to perform side effects in functional components. In this case, the `useEffect` hook is used to fetch the contacts when the component mounts. The empty dependency array (`[]`) ensures that the effect is only executed once, equivalent to the `componentDidMount` lifecycle method in class components.

```jsx
  const fetchContacts = () => {
    // Simulating contact fetching (replace with your own implementation)
    const fakeContacts = [
      { id: 1, name: 'John Doe', number: '123-456-7890' },
      { id: 2, name: 'Jane Smith', number: '987-654-3210' },
      // Add more contacts as needed
    ];

    // Generate 100 random Indian names
    const randomIndianNames = generateRandomIndianNames(100);
    const randomContacts = randomIndianNames.map((name, index) => ({
      id: index + 3, // Starting from 3 to avoid conflicts with existing contacts
      name,
      number: generateRandomPhoneNumber(),
    }));

    setContacts([...fakeContacts, ...randomContacts]);
    setFilteredContacts([...fakeContacts, ...randomContacts]);
  };
```

The `fetchContacts` function is responsible for retrieving the contact data. In this case, it's using fake data for demonstration purposes. You can replace this function with your own implementation to fetch contacts from an API or a database. The function combines static contacts (`fakeContacts`) with randomly generated contacts (`randomContacts`) to simulate a larger contact list.

```jsx
  const generateRandomIndianNames = (count) => {
    // Simulating random Indian names (replace with your own implementation)
    const indianNames = [
      'Arjun',
      'Aditi

',
      'Aarav',
      'Anaya',
      'Advait',
      // Add more Indian names here
    ];

    const randomNames = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * indianNames.length);
      randomNames.push(indianNames[randomIndex]);
    }

    return randomNames;
  };
```

The `generateRandomIndianNames` function generates a specified number of random Indian names. Currently, it uses a predefined array of Indian names, but you can replace it with your own implementation to generate names dynamically.

```jsx
  const generateRandomPhoneNumber = () => {
    // Generate a random Indian phone number
    const randomDigits = Math.floor(Math.random() * 10000000000);
    const phoneNumber = `+91${randomDigits.toString().padStart(10, '0')}`;
    return phoneNumber;
  };
```

The `generateRandomPhoneNumber` function generates a random Indian phone number. It generates a 10-digit random number and formats it as an Indian phone number by prepending "+91" to the number.

```jsx
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredContacts(filtered);
  };
```

The `handleSearch` function is called when the user types in the search input. It updates the `searchQuery` state variable and filters the `contacts` based on the search query. The filtered contacts are then stored in the `filteredContacts` state variable.

```jsx
  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };
```

The `handleContactPress` function is called when a contact is pressed in the contact list. It sets the selected contact in the `selectedContact` state variable, which triggers the display of the contact details modal.

```jsx
  const closeModal = () => {
    setSelectedContact(null);
  };
```

The `closeModal` function is called when the user closes the contact details modal. It resets the `selectedContact` state variable to `null`, causing the modal to close.

```jsx
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
    setNewContactName('');
    setNewContactNumber('');
  };
```

The `toggleAddModal` function is called when the user presses the add contact button. It toggles the visibility of the add contact modal by negating the `isAddModalVisible` state variable. Additionally, it resets the `newContactName` and `newContactNumber` state variables to empty strings, ensuring that the input fields are cleared when the modal is opened.

```jsx
  const handleAddContact = () => {
    // Generate a unique ID for the new contact
    const newId = contacts.length + 1;

    // Create a new contact object
    const newContact = {
      id: newId,
      name: newContactName,
      number: newContactNumber,
    };

    // Update the contacts list
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);

    // Close the add modal
    toggleAddModal();
  };
```

The `handleAddContact` function is called when the user presses the "Create Contact" button in the add contact modal. It generates a unique ID for the new contact based on the current number of contacts, creates a new contact object with the provided name and number, updates the `contacts` and `filteredContacts` state variables with the new contact, and then closes the add contact modal by

 calling `toggleAddModal`.

```jsx
  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactNumber}>{item.number}</Text>
    </TouchableOpacity>
  );
```

The `renderContactItem` function is used as the `renderItem` function for the `FlatList` component. It defines the rendering logic for each contact item in the list. Each contact item is rendered as a `TouchableOpacity` component, displaying the contact's name and number. When a contact is pressed, the `handleContactPress` function is called with the corresponding contact as an argument.

```jsx
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        style={styles.contactList}
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal visible={selectedContact !== null} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            {selectedContact && (
              <>
                <Text style={styles.modalTitle}>{selectedContact.name}</Text>
                <Text style={styles.modalText}>{selectedContact.number}</Text>
              </>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>

      <Modal visible={isAddModalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Contact</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Name"
              value={newContactName}
              onChangeText={setNewContactName}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Phone Number"
              value={newContactNumber}
              onChangeText={setNewContactNumber}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddContact}
            >
              <Text style={styles.addButtonText}>Create Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleAddModal}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for various components
});
```

Finally, the `render` method returns the JSX code that defines the UI of the application. The UI consists of a title, a search input field, a contact list rendered using `FlatList`, a contact details modal rendered using `Modal`, an "Add Contact" button, and an add contact modal. The styles for these components are defined using the `StyleSheet.create` method.

This is a high-level overview of the code and its functionalities. If you have any specific questions or need further clarification, feel free to ask!

## The following libraries and components are used in the provided code:

- **React**: The core library for building the user interface.
- **useState**: A hook provided by React for managing state in functional components.
- **useEffect**: A hook provided by React for performing side effects in functional components.
- **StyleSheet**: A module from the React Native library that provides a way to define styles for React Native components.
- **Text**: A component from React Native used to display text.
- **View**: A component from React Native used to create a container or a view for other components.
- **TextInput**: A component from React Native used to accept user input via a text field.
- **FlatList**: A component from React Native used to render a scrollable list of items efficiently.
- **TouchableOpacity**: A component from React Native used to create a touchable area that provides feedback when pressed.
- **Modal**: A component from React Native used to display a modal overlay on top of the current screen.
- **TouchableWithoutFeedback**: A component from React Native used to detect touches anywhere on the screen, excluding specific components.
- **Keyboard**: A module from React Native used to interact with the keyboard.

These libraries and components are essential for creating a functional and interactive Contact List app in React Native.
  
  
  
![Screenshot_1685929535](https://github.com/Ishanvivek/contact-app/assets/116803086/e652078b-c103-4f2c-b09f-d3ec1f3b63a5)
![Screenshot_1685929612](https://github.com/Ishanvivek/contact-app/assets/116803086/df1dd872-2306-4330-8afc-2b29566312ef)
![Screenshot_1685929509](https://github.com/Ishanvivek/contact-app/assets/116803086/edf55148-e0d2-4b0d-bb43-978d99f6177f)
![Screenshot_1685929588](https://github.com/Ishanvivek/contact-app/assets/116803086/bc41d9b1-5807-40d7-9a6a-178bef8cce16)
![Screenshot_1685929559](https://github.com/Ishanvivek/contact-app/assets/116803086/d21fae5d-e6a1-44a0-9e0a-9d3a61bfd177)



