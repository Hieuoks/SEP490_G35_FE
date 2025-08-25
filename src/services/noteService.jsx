import axios from 'axios';
import { message } from 'antd';
import { getHeader, getHeader2 } from './api';
import Cookies from 'js-cookie';
import { get } from 'react-hook-form';
const BASE_URL = 'https://localhost:7012/api';
const userId = Cookies.get('userId');
export const getNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GuideNote/tour-operator/notes`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    message.error('Unable to load notes');
    throw error;
  }
}
export const getNoteByTourGuide = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GuideNote/notes`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes by tour guide:', error);  
    message.error('Unable to load notes for this tour guide');
    throw error;
  }
}
export const createNote = async (note) => {
  try {

    const response = await axios.post(`${BASE_URL}/GuideNote/notes-by-TourGuide`, note, {
      headers: getHeader2(),

    });
    message.success('Note created successfully');
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    message.error('Unable to create note');
    throw error;
  }
}
export const updateNote = async (noteId, title,extraCost,content,medias) => {
    try {
        const response = await axios.put(`${BASE_URL}/GuideNote/notes/${noteId}`, {
            title: title,
            content: content,

            extraCost:extraCost,

            mediaUrls: medias
        }, {
            headers: getHeader(),
        });
        message.success('Note updated successfully');
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error);
        message.error('Unable to update note');
        throw error;
    }
}
export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/GuideNote/notes/${noteId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    message.error('Unable to delete note');
    throw error;
  }
}
