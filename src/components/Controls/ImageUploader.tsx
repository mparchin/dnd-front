import { memo, useMemo } from "react";

import ImageUploading, { ImageListType } from "react-images-uploading";
import { usePrimaryColor } from "../../theme";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { create } from "zustand";
import { useImagesApi } from "../../API/images";

interface ImageUploaderState {
  images: ImageListType;
  setImage: (images: ImageListType) => void;
  isUploading: boolean;
  setIsUploading: (flag: boolean) => void;
}

const useImageUploaderState = create<ImageUploaderState>()((set) => ({
  images: [],
  setImage: (images) => set({ images: images }),
  isUploading: false,
  setIsUploading: (flag) => set({ isUploading: flag }),
}));

interface Props {
  imageUrl: string;
  setImageUrl: (str: string) => void;
}

export const ImageUploader = memo((p: Props) => {
  const state = useImageUploaderState((state) => state);
  const api = useImagesApi();

  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    state.setIsUploading(true);
    // data for submit
    console.log(imageList, addUpdateIndex);
    if (imageList.length > 0 && imageList[0].file)
      api(imageList[0].file, state.setIsUploading).then((val) => {
        if (typeof val == "string") p.setImageUrl(val);
      });
    state.setImage(imageList);
  };

  return (
    <div className="flex flex-row pt-10">
      <div className="grow-[3] basis-0 flex flex-col shrink pr-1">
        <div className="grow"></div>
        <div className="pl-2 pt-2">Tap to add or edit</div>
        <div className="grow-[2]"></div>
      </div>
      <div>
        <ImageUploading
          value={state.images}
          onChange={onChange}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload }) => (
            // write your building UI
            <div onClick={onImageUpload}>
              {imageList.length == 0 && p.imageUrl == "" ? (
                <Button
                  className="w-36 h-36 mt-1 border-2 border-current rounded-lg text-6xl"
                  variant="outlined"
                  style={coloredStyle}
                >
                  +
                </Button>
              ) : p.imageUrl != "" ? (
                <Avatar
                  className={`w-36 h-36 ${
                    state.isUploading ? "blur-sm" : ""
                  }  mt-1 border-2 border-current rounded-lg`}
                  src={p.imageUrl}
                  variant="rounded"
                  style={coloredStyle}
                />
              ) : (
                imageList.map((image, index) => (
                  <Avatar
                    key={index}
                    className={`w-36 h-36 ${
                      state.isUploading ? "blur-sm" : ""
                    }  mt-1 border-2 border-current rounded-lg`}
                    src={image["data_url"]}
                    variant="rounded"
                    style={coloredStyle}
                  />
                ))
              )}
            </div>
          )}
        </ImageUploading>
        <CircularProgress
          className={`relative -top-24 left-12 ${
            state.isUploading ? "" : "invisible"
          }`}
        />
      </div>
      <div className="grow-[4] basis-0 flex flex-col">
        <div className="pl-2 pt-2">
          works best when the image resolution is close to a square
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
});
