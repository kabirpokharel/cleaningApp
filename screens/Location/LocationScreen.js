import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../component/CustomButton";
import PageTemplate from "../../component/PageTemplate";
import TitleWithDescription from "../../component/TitleWithDescriptionComponent";
import { baseUrl } from "../../constants/constants";
import {setLocation} from "../../redux/actions"




const LocationScreen = (props) => {
    const { navigation } = props;
    const [allLocation, setAllLocation] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${baseUrl}/location/viewAll`).then(res => {
            setAllLocation(res.data.locations);
        });
      }, []);

      
      
      
    const LocationSelection = ({allLocation}) => {
        return <View>
            {allLocation.map(location => {
                return <CustomButton key={location.shortid} label={location.name} onPress={()=>{
                    dispatch(setLocation(location));
                    navigation.navigate("home")}  
                    // console.log("location id",location.shortid)} 
                }
                />
            })}
        </View>
    }


    return (
    <PageTemplate>
        <TitleWithDescription title="Location" description="Slect your site" />
        {!!allLocation && !!allLocation.length && (
            <LocationSelection allLocation={allLocation} dispatch={dispatch} />
        )}
    </PageTemplate>
    );
}

export default LocationScreen;