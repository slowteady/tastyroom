import {colors} from '@/constants';
import {useMutateCreatePost} from '@/hooks/queries/useMutateCreatePost';
import useMutateUpdatePost from '@/hooks/queries/useMutateupdatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailPostStore from '@/store/useDetailPostStore';
import {MarkerColor} from '@/types/domain';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {LatLng} from 'react-native-maps';
import Opticons from 'react-native-vector-icons/Octicons';
import CustomButton from '../common/CustomButton';
import InputField from '../common/InputField';
import PreviewImageList from '../common/PreviewImageList';
import AddPostHeaderRight from './AddPostHeaderRight';
import DatePickerOptions from './DatePickerOptions';
import ImageInput from './ImageInput';
import MarkerSelector from './MarkerSelector';
import ScoreInput from './ScoreInput';

interface PostFormProps {
  location: LatLng;
  isEdit?: boolean;
}

const PostForm = ({location, isEdit = false}: PostFormProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const address = useGetAddress(location);
  const dateOption = useModal();
  const ImagePicker = useImagePicker({
    initialImage: isEditMode ? detailPost.images : [],
  });
  usePermission('PHOTO');

  const handleSubmit = useCallback(() => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: ImagePicker.imageUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );

      return;
    }

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }, [
    ImagePicker.imageUris,
    addPost.values.description,
    addPost.values.title,
    address,
    createPost,
    date,
    detailPost?.id,
    isEditMode,
    location,
    markerColor,
    navigation,
    score,
    updatePost,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Opticons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit ? getDateWithSeparator(date, '.') : '날짜 선택'
            }
            onPress={dateOption.show}
          />
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
          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
            score={score}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={ImagePicker.handleChange} />
            <PreviewImageList
              imageUris={ImagePicker.imageUris}
              onDelete={ImagePicker.deleteImageUri}
              onChangeOrder={ImagePicker.changeImageUrisOrder}
              showOptions
            />
          </View>
          <DatePickerOptions
            date={date}
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
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
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default PostForm;
