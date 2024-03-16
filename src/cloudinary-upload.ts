import cloudinary, {UploadApiErrorResponse,UploadApiResponse} from 'cloudinary';


export const uploads = (
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
return new Promise((resolve) => {
  cloudinary.v2.uploader.upload(
    file,
    {
      public_id,
      overwrite,
      invalidate,
      resource_type: 'auto'
    },
    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (error) resolve(error);
      resolve(result)
    }
  )
})
}

export const videUploads = (
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 50000,
        resource_type: 'video'
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result)
      }
    )
  })
}