import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Button from "@src/components/Button/Button";
import {
  BottomModalActions,
  setFranchiseeId,
  setFranchiseeName,
  setPickupPointDetails,
} from "@src/redux/actions/combineAction";
import toast from "@src/services/toast";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { TextField } from "@src/components/TextField/TextField";
import { useAppDispatch } from "@src/redux/store";
import { users } from "@src/services/api";
import { axiosInstance } from "@src/helpers/axiosHelper";

type LoginFormContainerProps = {};

export const SelectionForm = ({}: LoginFormContainerProps) => {
  const [selectedFranchisee, setSelectedFranchisee] = useState();
  const [selectedPickupPoint, setSelectedPickupPoint] = useState();
  const [franchiseeList, setFranchiseeList] = useState([]);
  const [recyclerList, setRecyclerList] = useState([]);

  const dispatch = useAppDispatch();

  const onNext = () => {
    if (!selectedFranchisee) {
      toast.danger({ message: "Please select a franchisee!" });
      return;
    }

    if (!selectedPickupPoint) {
      toast.danger({ message: "Please select a facility!" });
      return;
    }

    dispatch(setFranchiseeId(selectedFranchisee));
    dispatch(
      setFranchiseeName(
        franchisees?.find((each) => each.id === selectedFranchisee)?.label
      )
    );

    dispatch(
      setPickupPointDetails(
        recyclerList?.find((each) => each.id === selectedPickupPoint)
      )
    );
  };

  useEffect(() => {
    users.getSMART_CENTRE().then((res) => {
      setFranchiseeList(res?.data);
    });
  }, []);

  const getRecylers = async (selectedFranchisee) => {
    const response = await axiosInstance.get(
      `facilities/${selectedFranchisee}`
    );

    setRecyclerList(response?.data);
  };
  useEffect(() => {
    setSelectedPickupPoint(undefined);
    selectedFranchisee && getRecylers(selectedFranchisee);
  }, [selectedFranchisee]);

  const franchisees = franchiseeList?.map((each) => ({
    id: each?.id,
    label: each?.personalDetails?.name,
    value: each?.id,
  }));

  const facilities = recyclerList?.map((obj) => {
    return {
      id: obj?.id,
      label: obj?.personalDetails?.name,
      value: obj?.id,
    };
  });

  return (
    <View style={{ width: "100%" }}>
      <TextField
        style={{
          paddingBottom: 5,
          fontSize: 14,
        }}
      >
        EXN Member
      </TextField>
      <DropDown
        placeholder="Select  EXN Member"
        rightIconName="sort-down"
        setSelectedValue={setSelectedFranchisee}
        combineOnPress={(rest) =>
          dispatch(
            BottomModalActions.toggleBottomModal({
              title: "Select  EXN Member",
              showList: true,
              data: franchisees,
              ...rest,
            })
          )
        }
      />

      {selectedFranchisee && (
        <>
          <TextField
            style={{
              paddingBottom: 5,
              fontSize: 14,
            }}
          >
            Facility
          </TextField>
          <DropDown
            placeholder="Select Facility"
            rightIconName="sort-down"
            setSelectedValue={setSelectedPickupPoint}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: "Select Facility",
                  showList: true,
                  data: facilities,
                  ...rest,
                })
              )
            }
          />
        </>
      )}

      <Button textStyle={{ lineHeight: 18 }} onPress={onNext} title={"Next"} />
    </View>
  );
};
