import React from 'react';
import { useEffect, useCallback, useContext } from 'react';
import { SymptomsContext } from './SymptomsContext';
import _ from 'lodash';
import { httpGet, httpPost, httpPostForDummies } from '../utils/Api';

const initialState = {
    isLoading: null,
    symptoms: null,
    loadingError: null,
};

let images = {
    "Brain" : require("../components/modals/OrganImages/Brain.jpg"),
    "Eyes" : require("../components/modals/OrganImages/Eyes.jpg"),
    "Nose" : require("../components/modals/OrganImages/Nose.jpg"),
    "Tongue" : require("../components/modals/OrganImages/Tongue.jpg"),
    "Face" : require("../components/modals/OrganImages/Face.jpg"),
    "Stomach" : require("../components/modals/OrganImages/Stomach.jpg"),
    "Heart" : require("../components/modals/OrganImages/Heart.jpg"),
    "Lungs" : require("../components/modals/OrganImages/Lungs.jpg"),
    "Excretory" : require("../components/modals/OrganImages/Excretory.jpg"),
    "Abdomen" : require("../components/modals/OrganImages/Abdomen.jpg"),
    "Back" : require("../components/modals/OrganImages/Back.jpg"),
    "Throat" : require("../components/modals/OrganImages/Throat.jpg"),
    "Chest" : require("../components/modals/OrganImages/Chest.jpg"),
    "Liver" : require("../components/modals/OrganImages/Liver.jpg"),
    "Neck" : require("../components/modals/OrganImages/Neck.jpg"),
    "Limbs" : require("../components/modals/OrganImages/Limbs.jpg"),
}

export const SymptomsStore = ({ children }) => {
    const [state, setState] = React.useState(initialState);
    const { isLoading, symptoms, loadingError } = state;

    console.disableYellowBox = true;
    let searchingSymptoms = [];

    useEffect(() =>{
        async function fetchData(){
            if(!symptoms && !loadingError && !isLoading){
                try{
                    setState({isLoading: true, loadingError: null });
                    const response = await httpGet('symptoms/');
                    setState({isLoading: false, symptoms: response })
                }
                catch(e){
                    setState({ isLoading: false, loadingError: response })
                }
            }
        }
        fetchData();
    }, [])

    const onSymptomTouch = (symptom) => {
        searchingSymptoms.push(symptom);
    }

    const onSymptomDelete = (symptom) => {
        searchingSymptoms = _.filter(searchingSymptoms, function(element){return element !== symptom})
        return searchingSymptoms;
    }

    const onDiagnosisCheck = async () => {
        const setOfSymptoms = new Set(searchingSymptoms);
        let symptomsString = "";

        for(var index = 0; index < setOfSymptoms.size; index += 1){
           symptomsString = symptomsString.concat(`${searchingSymptoms[index].symptomName};`)
        }

        const response = await httpPost("diagnosis", symptomsString);
        return response;
    }

    const value = {...state, onSymptomTouch, onSymptomDelete, onDiagnosisCheck, images, searchingSymptoms};
    return (
        <SymptomsContext.Provider value={value}>
            {children}
        </SymptomsContext.Provider>
    )
}