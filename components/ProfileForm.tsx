'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  climbingLevel: z.string().min(1, 'Climbing level is required').max(100),
  profilePictureUrl: z.string(), // Add necessary validation here
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function EditProfile() {
  const router = useRouter();
  async function userData(data: FormSchemaType) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        climbingLevel: user.climbingLevel,
        // avatar: user.profilePictureUrl,
      }),
    });

    if (response.ok) {
      const responseData: LoginResponseBodyPost = await response.json();
      router.push(
        getSafeReturnToPath(props.returnTo) ||
          `/profile/${responseData.user.username}`,
      );

      router.refresh();
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // const handleProfilePictureUpload = async (event) => {
  //   const file = event.target.files[0];
  //   // Upload file to Cloudinary here and update the profile picture form field
  //   const uploadedImageUrl = await uploadImageToCloudinary(file);
  //   setValue('profilePictureUrl', uploadedImageUrl);
  // };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await userData(data);
  };

  return (
    <section className="bg-primary-background dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Profile
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required={true}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <span className="text-red-800 block mt-2">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required={true}
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <span className="text-red-800 block mt-2">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="climbingLevel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Climbing Level
                </label>
                <input
                  id="climbingLevel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required={true}
                  {...register('climbingLevel')}
                />
                {errors.climbingLevel && (
                  <span className="text-red-800 block mt-2">
                    {errors.climbingLevel.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  onChange={handleProfilePictureUpload}
                />
                {errors.profilePictureUrl && (
                  <span className="text-red-800 block mt-2">
                    {errors.profilePictureUrl.message}
                  </span>
                )}
              </div>
              <button
                className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
