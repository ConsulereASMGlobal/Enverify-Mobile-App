import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from './globals/colors';
import { setToken } from './helpers/axiosHelper';
import {
  notificationActions,
  profileActions
} from './redux/actions/combineAction';
import { selectToken, selectUserId, showBotomOverlay } from './redux/selectors';
import { RootState, useAppDispatch } from './redux/store';
import { BotomOverlay } from './components/BottomModal/BottomModal';

type RootContainerProps = {};

export const RootContainer = ({}: RootContainerProps) => {
  const dispatch = useAppDispatch();

  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);

  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    !!userId && dispatch(profileActions.getProfile({ id: userId }));
    !!userId && dispatch(notificationActions.getNotification());
  }, [userId]);

  const isLoading = useSelector((state: RootState) => state.orderList.loading);
  const { showBottomModal, modalData, title, onSelect } =
    useSelector(showBotomOverlay);
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={{ position: 'absolute' }}>
        {showBottomModal && (
          <BotomOverlay
            visible={showBottomModal}
            data={modalData}
            title={title}
            onSelect={onSelect}
          />
        )}
      </View>
    </>
  );
};
