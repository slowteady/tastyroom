import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import {colors, mapNavigations} from '@/constants';
import useForm from '@/hooks/useForm';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {validateAddPost} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Opticons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = NativeStackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({route, navigation}: AddPostScreenProps) => {
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });
  const descriptionRef = useRef<TextInput | null>(null);
  const {location} = route.params;

  const handleSubmit = () => {
    //
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Opticons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요 (선택)"
            error={addPost.errors.description}
            returnKeyType="next"
            blurOnSubmit={false}
            touched={addPost.touched.description}
            multiline
            {...addPost.getTextInputProps('description')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
});

export default AddPostScreen;
