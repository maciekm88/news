import React, { useEffect, useState } from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale, ScaledSheet} from 'react-native-size-matters';
import RenderHtml from 'react-native-render-html'
import moment from 'moment';

//components
import HeartIcon from "../assets/icons/HeartIcon";
import CommentIcon from '../assets/icons/CommentIcon';

//placeholders
const placeholder = require('../assets/placeholders/avatar.png');

const {width} = Dimensions.get('window');


type Props = {
    id: number;
    fullName: string;
    image: string;
    title: string;
    content: string;
    createDate: Date;
    numberOfLikes: number;
    comments: Array<number>;
};

const PostPreview: React.FC<Props> = ({
    // id,
    fullName,
    // image,
    title,
    content,
    createDate,
    numberOfLikes,
    comments,
}): JSX.Element => {

    const [posted, setPosted] = useState('');

    const source = {
        html: content
    };

    useEffect(() => {
        function date() {
            let postDate = new Date(createDate);
            return (
            // console.log('posted: ', moment(postDate).format('DD MMMM YYYY, hh:mm:ss')),
            // setPosted(moment(postDate).local().format('DD MMMM YYYY, hh:mm:ss'))
            setPosted(moment(postDate).format('LLLL'))
            )
        }
        date();
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Otwórz artykuł: ${title} `}
            accessibilityHint={`Przenosi do szczegółowego widoku artykułu.`}
        >
            <View style={styles.postAuthor}>
                <Image
                    source={placeholder}
                    style={styles.image}
                    resizeMode={'center'}
                    accessible={true}
                    accessibilityRole="image"
                    accessibilityLabel={`zdjęcie autora: ${fullName}`}
                    accessibilityHint="Przedstawia zdjęcie wybranego autora"
                />
                <Text style={styles.author}>
                    {fullName}
                </Text>
            </View>
            <View style={styles.postTitle}>
                <Text style={styles.leadTitle}>
                    {title ? title : 'Brak tytułu 😉🧾💭'}
                </Text>
                <View style={styles.userInteractions}>
                    <Text style={styles.author}>
                        {numberOfLikes} 
                    </Text>
                    <HeartIcon
                        style={styles.interactionIcons}
                        width={scale(18)}
                        height={verticalScale(20)}
                    />
                    <Text style={styles.author}>
                        {comments.length} 
                    </Text>
                    <CommentIcon
                        style={styles.interactionIcons}
                        width={scale(18)}
                        height={verticalScale(20)}
                    />
                </View>
            </View>
            <View style={styles.articleText}>
                <RenderHtml 
                    contentWidth={width}
                    source={source}
                />
            </View>
            <Text style={styles.postTime}>
                {posted}
            </Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'grey',
        borderWidth: 2,
        borderRadius: '20@ms',
        flexDirection: 'column',
        marginHorizontal: '10@s',
        marginVertical: '5@vs',
        padding: '5@ms',
        shadowColor: 'purple',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 7,
    },
    postAuthor: {
        marginVertical: '2@vs',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: '45@ms',
        height: '45@ms',
        borderRadius: width / 2,
    },
    author: {
        paddingLeft: '10@ms',
        letterSpacing: '0.48@ms',
        fontWeight: "bold",
        fontSize: '16@ms',
    },
    postTitle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5@vs',
    },
    leadTitle: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '5@s',
        fontWeight: "bold",
        fontSize: '16@ms',
        color: 'navy',

    },
    userInteractions: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '25@vs',
        marginVertical: '2@vs',
    },
    interactionIcons: {
        paddingLeft: '40@s',
    },
    articleText: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'darkgrey',
        padding: '5@ms',
        borderRadius: '10@ms',
    },
    postTime: {
        marginVertical: '5@vs',
        paddingLeft: '5@s',
    },
});

export default PostPreview;