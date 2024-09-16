"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import {
  createUserProfile,
  deleteUserProfile,
  fetchUserProfile,
  setUserProfile,
  updateUserProfile,
} from "@/lib/state/userProfileSlice";
import React, { useCallback, useEffect, useState } from "react";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { web5, did } = useAppSelector((state) => state.auth);
  const {
    name,
    location,
    bio,
    data: profile,
    status: profileStatus,
  } = useAppSelector((state) => state.userProfile);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
  });

  const handleSetFormData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleCreateProfile = useCallback(
    (e: any, formData: any) => {
      e.preventDefault();

      if (web5 && did) {
        if (!formData.name || !formData.bio || !formData.location) {
          alert("Please fill in all fields");
          return;
        }

        const newProfile = formData;
        dispatch(createUserProfile({ web5, did, profile: newProfile }));
        dispatch(setUserProfile(newProfile));
        alert("Profile created successfully");
      } else {
        alert("web5 or did is undefined");
      }
    },
    [dispatch, web5, did]
  );

  const handleFetchUserProfile = useCallback(() => {
    if (web5 && did) {
      dispatch(fetchUserProfile({ web5, did }));
    } else {
      alert("web5 or did is undefined");
    }
  }, [dispatch, web5, did]);

  // Update user profile
  const handleUpdateProfile = useCallback(async () => {
    if (web5 && did && profile) {
      const updatedProfile = {
        name: profile.name,
        bio: "Updated bio for John Doe",
        location: profile.location,
      };

      try {
        const result = await dispatch(
          updateUserProfile({ web5, did, profile: updatedProfile })
        ).unwrap();

        dispatch(fetchUserProfile({ web5, did }));
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    } else {
      console.log("Cannot update profile:", { web5, did, profile });
    }
  }, [dispatch, web5, did, profile]);

  // Delete user profile
  const handleDeleteProfile = useCallback(async () => {
    if (web5 && did) {
      try {
        const result = await dispatch(
          deleteUserProfile({ web5, did })
        ).unwrap();
      } catch (error) {
        console.error("Failed to delete profile:", error);
      }
    } else {
      console.log("Cannot delete profile:", { web5, did });
    }
  }, [dispatch, web5, did]);

  useEffect(() => {
    if (web5 && did && profile) {
      dispatch(fetchUserProfile({ web5, did }));
    }
  }, [web5, did, profile]);

  return (
    <main className="w-full mx-auto">
      <div className="section-container grid grid-cols-2 items-start justify-between gap-5">
        <div>
          {profile && (
            <>
              <div>
                <div>
                  <div>
                    <span>name : </span> <span>{name}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleDeleteProfile}
                disabled={profileStatus === "loading"}
              >
                Delete Profile
              </Button>
            </>
          )}
        </div>
        <div>
          <form
            onSubmit={(e) => handleCreateProfile(e, formData)}
            className="w-full mx-auto space-y-5"
          >
            <div className="w-full flex flex-col items-start justify-center space-y-3">
              <label className="text-[14px] font-semibold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your name"
                required
                id="name"
                value={formData.name}
                onChange={handleSetFormData}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-3">
              <label className="text-[14px] font-semibold" htmlFor="bio">
                Biography
              </label>
              <input
                type="text"
                name="bio"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your bio"
                required
                id="bio"
                value={formData.bio}
                onChange={handleSetFormData}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-3">
              <label className="text-[14px] font-semibold" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your location"
                required
                id="location"
                value={formData.location}
                onChange={handleSetFormData}
              />
            </div>

            {profile ? (
              <Button type="button" onClick={handleUpdateProfile}>
                {profileStatus === "loading"
                  ? "Updating ..."
                  : "Update Profile"}
              </Button>
            ) : (
              <Button type="submit">
                {profileStatus === "loading"
                  ? "Creating ..."
                  : "Create Profile"}
              </Button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
