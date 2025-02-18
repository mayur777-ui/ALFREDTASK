import axios from 'axios';

const API_URL = 'http://localhost:8000/api/flashcards'; 

export const fetchFlashcards = async () => {
    try {
        const { data } = await axios.get(API_URL);
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching flashcards:", error.response?.data || error.message);
        throw new Error("Error fetching flashcards");
    }
};

export const addFlashcard = async (newFlashcard) => {
    try {
        const { data } = await axios.post(API_URL, newFlashcard);
        return data;
    } catch (error) {
        console.error("Error adding flashcard:", error.response?.data || error.message);
        throw new Error("Error adding flashcard");
    }
};

export const updateFlashcard = async (id, correct) => {
    try {
        const { data } = await axios.put(`${API_URL}/${id}`, { correct });
        return data;
    } catch (error) {
        console.error("Error updating flashcard:", error.response?.data || error.message);
        throw new Error("Error updating flashcard");
    }
};

export const deleteFlashcard = async (id) => {
    try {
        const { data } = await axios.delete(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting flashcard:", error.response?.data || error.message);
        throw new Error("Error deleting flashcard");
    }
};
