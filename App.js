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

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const generateRandomIndianNames = (count) => {
    // Simulating random Indian names (replace with your own implementation)
    const indianNames = [
      'Arjun',
      'Aditi',
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

  const generateRandomPhoneNumber = () => {
    // Generate a random Indian phone number
    const randomDigits = Math.floor(Math.random() * 10000000000);
    const phoneNumber = `+91${randomDigits.toString().padStart(10, '0')}`;
    return phoneNumber;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
    setNewContactName('');
    setNewContactNumber('');
  };

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Contact List</Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          onChangeText={handleSearch}
          value={searchQuery}
        />

        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactPress(item)}
            >
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactNumber}>{item.number}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={selectedContact !== null}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.contactName}>
                {selectedContact && selectedContact.name}
              </Text>
              <Text style={styles.contactNumber}>
                {selectedContact && selectedContact.number}
              </Text>
            </View>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity onPress={toggleAddModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Modal
          visible={isAddModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleAddModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.addModalContent}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setNewContactName}
                value={newContactName}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setNewContactNumber}
                value={newContactNumber}
                keyboardType="phone-pad"
              />

              <TouchableOpacity
                onPress={handleAddContact}
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>Create Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleAddModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: '#ggg',
    paddingVertical: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
