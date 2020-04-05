import React from 'react';
import { useEffect, useCallback, useContext } from 'react';
import { SymptomsContext } from './SymptomsContext';
import { httpGet, httpPost } from '../utils/Api';

const initialState = {
    isLoading: false,
    symptoms: null,
    loadingError: null,
    searchingSymptoms: ""
};

export const SymptomsStore = ({ children }) => {
    const [state, setState] = React.useState(initialState);
    const { isLoading, symptoms, loadingError, searchingSymptoms } = state;
    
    useEffect(() =>{
        if(!symptoms && !loadingError && !isLoading){
            setState({isLoading: true, loadingError: null });
            httpGet('symptoms/')
                .then(json =>{
                    setState({isLoading: false, symptoms: json})
                })
                .catch(loadingError => {
                    setState({isLoading: false, loadingError})
                })
        }
    }, [])

    const onSymptomTouch = ({symptom}) => {
        searchingSymptoms.concat(";" + symptom);
        setState({searchingSymptoms: searchingSymptoms});
        console.log(state.searchingSymptoms);
    }

    const onDiagnosisCheck = () => {
        setState({searchingSymptoms: ""});
        return httpPost("diagnosis", {searchingSymptoms})
    }

    const value = {...state, onSymptomTouch, onDiagnosisCheck};
    return (
        <SymptomsContext.Provider value={value}>
            {children}
        </SymptomsContext.Provider>
    )
}