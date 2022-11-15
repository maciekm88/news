import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";

//styles
import styles from "./News.styles";

//components
import PostPreview from "./PostPreview";

type Props = {
};

const News: React.FC<Props> = ({

}): JSX.Element => {

  const [token, setToken] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [newsfeedData, setNewsfeedData] = useState([]);

    // POST request to obtain bearer token from API

  useEffect(() => {
    axios
    .post('https://afreactrecrutation.azurewebsites.net/api/Auth', {
      "username": "rekrutacja@emplo.com",
      "password": "sde4355tygswJ5t%eDX"
      })
      .then(response => {
        console.log("Your Bearer token is: ", response.data.token);
        setToken(response.data.token);
        })
      .catch(error => console.log("Error from POST request: ", error))
      .finally(() => console.log('POST request finished.'))
  }, [setToken]);


  // GET request to obtain data from API after authorization

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          await axios    
          .get('https://afreactrecrutation.azurewebsites.net/api/Messages?page=0', {
            headers: {Authorization: token}
          })
            .then(res => {
              console.log('Getting response');
              // console.log('Posts: ', res.data.messages);
              console.log('Number of posts: ', res.data.messages.length);
              setNewsfeedData(res.data.messages);
              console.log('Got data from API.');
              console.log('GET request finished.');
            });
        } catch (err) {
          console.log("Error from GET request: ", err)
        }
      })();
    }
  }, [token]);


  //Refresh newsfeedData api call after swipe down gesture

  const onRefresh = () => {
    console.log('Swiped down gesture to make new GET request to API.');
    setRefreshing(true);

    axios    
    .get('https://afreactrecrutation.azurewebsites.net/api/Messages?page=0', {
      headers: {Authorization: token}
    })
      .then(res => {
        console.log('Getting response');
        // console.log('Posts: ', res.data.messages);
        console.log('Number of posts: ', res.data.messages.length);
        setNewsfeedData(res.data.messages);
        console.log('Got refreshed data from API.');
      })
      .catch(err => console.log("Error from GET request: ", err))
      .finally(() => {console.log('GET request finished.')});

    setTimeout(() => {
      setRefreshing(false);
      console.log('Data refreshed.');
    }, 1000);
  };


  const renderItem = ({item}: any) => {
    return (
      <PostPreview
        id={item.id}
        fullName={item.author.fullName}
        image={item.image}
        title={item.title}
        content={item.content}
        createDate={item.createDate}
        numberOfLikes={item.numberOfLikes}
        comments={item.comments}
      />
    );
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <Text>Swipe down at the top of the list to refresh Newsfeed!</Text> */}
        <FlatList
          data={newsfeedData}
          // keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </SafeAreaView> 
    </>
  );
};

export default News;
