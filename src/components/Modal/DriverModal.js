import React, { useState, useEffect } from 'react';
import '../../Modal.css';
import { createClient } from "@supabase/supabase-js";
import {differenceInYears} from "date-fns";

const supaUrl = 'https://rtpsslzuthmeiqlmgzgs.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cHNzbHp1dGhtZWlxbG1nemdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5OTgxOTMsImV4cCI6MjAyNDU3NDE5M30.cPX5jjynOI_GLePPAQrtVorBVVNLM6oN9VEUfCwyl5c';

const supabase = createClient(supaUrl, supaAnonKey);


const DriverModal = ({ selectedDriver, open, onClose }) => {
    const [qualify, setQualify] = useState([]);
    const [age, setAge] = useState('');
    useEffect(() => {
     // if (!selectedYear) return; // If no year is selected, do nothing
 
      const fetchQualify = async () => {
        const { data, error } = await supabase
        .from('drivers')
        .select(`*
        `)
        .eq('driverId', selectedDriver);
  
        if (error) {
          console.error('Error fetching races:', error);
          return;
        }
  
        setQualify(data);
      };
  
      fetchQualify();
    }, [selectedDriver]);

    const calculateAge = ( date ) => {

        const dateObject = new Date(date);
        const today = new Date();
        const ageYears = differenceInYears(today, dateObject);

    
        // Set the age state with the calculated age
        setAge({
            years: ageYears
      });
    };
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            Close
          </p>
          <div className='content'>
            <p>Name {qualify[0].forename} {qualify[0].surname}</p>
            <h1>Date of Birth: {qualify[0].dob}</h1>
            {/* <p>Age: {calculateAge(qualify[0].dob)} </p> */}
            <p>Nationality {qualify[0].nationality}</p>
            <p>URL {qualify[0].url}</p>
          </div>
          <div className='btnContainer'>
            <button className='btnPrimary'>
              <span className='bold'>Favourite</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    
  );
};

export default DriverModal;