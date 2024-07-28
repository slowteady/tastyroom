import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import DatePickerOptions from '@/components/post/DatePickerOptions';
import ImageInput from '@/components/post/ImageInput';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import {colors, mapNavigations} from '@/constants';
import {useMutateCreatePost} from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types/domain';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const {location} = route.params;
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const address = useGetAddress(location);
  const dateOption = useModal();
  const ImagePicker = useImagePicker({initialImage: []});
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
    location,
    markerColor,
    navigation,
    score,
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
            label={isPicked ? getDateWithSeparator(date, '.') : '날짜 선택'}
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

export default AddPostScreen;
