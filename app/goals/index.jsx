import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Alert, 
  Modal, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { EllipsisVertical } from 'lucide-react-native'; 

const TechNotes = () => {
  const [goals, setGoals] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'goals'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(list);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
  try {
    const docRef = doc(db, "goals", id);
    await deleteDoc(docRef);
    console.log("Deleted:", id);
  } catch (error) {
    console.error("Delete failed:", error.message);
  }
};


  const formatDate = (date) => {
    if (!date) return 'Unknown';
    const jsDate = date.toDate ? date.toDate() : date;
    return jsDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/y5HZg3B.jpg" }} 
          style={styles.background}
          resizeMode="cover"
        >
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tech Notes</Text>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
            <Text style={styles.noteDate}>
              ➜ Date created: {formatDate(item.createdAt)}
            </Text>

            {}
            <Pressable 
              onPress={() => setMenuVisible(item.id)} 
              style={styles.menuBtn}
            >
              <EllipsisVertical size={22} color="#fff" />
            </Pressable>

            {}
            <Modal
            visible={menuVisible === item.id}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuVisible(null)}
        >
       <View style={styles.modalOverlay}>
        <View style={styles.menuContainer}>
        <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          setMenuVisible(null);
          router.push(`/goals/edit/${item.id}`);
        }}
      >
        <Text style={styles.menuText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          setMenuVisible(null);
          handleDelete(item.id);
        }}
      >
        <Text style={[styles.menuText, { color: '#f76f7aff' }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>this is what space feels like!</Text>
        }
      />

      <Pressable style={styles.logoutBtn} onPress={() => signOut(auth)}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default TechNotes;

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.53)',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  noteCard: {
    width: 300,
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.53)',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'relative',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingRight: 28, 
  },
  noteDate: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  menuBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 150,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
    color: '#aaa',
  },
  logoutBtn: {
    width: 400,
    backgroundColor: '#141414ff',
    margin: 20,
    padding: 14,
    borderRadius: 10,
  },
  logoutText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
