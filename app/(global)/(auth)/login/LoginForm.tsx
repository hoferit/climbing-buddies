'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { getSafeReturnToPath } from '../../../../utils/validation';
import { LoginResponseBodyPost } from '../../../api/(auth)/login/route';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),

  password: z.string().min(1, 'Password is required').max(100),
});
type Props = { returnTo?: string | string[] };

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm(props: Props) {
  const router = useRouter();
  async function loginData(data: FormSchemaType) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      const responseData: LoginResponseBodyPost = await response.json();
      router.push(
        getSafeReturnToPath(props.returnTo) ||
          `/users/${responseData.user.username}`,
      );

      router.refresh();
    } else {
      // Handle error response
      const errorData = await response.json();
      console.error('Error updating user: ', errorData);
      // Inform user about error
      enqueueSnackbar('Error logging in!', { variant: 'error' });
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await loginData(data);
  };

  return (
    <section className="bg-primary-background min-h-screen my-6 dark:bg-gray-900">
      <SnackbarProvider />
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Your name"
                  required={true}
                  {...register('username')}
                />
                {errors.username && (
                  <span className="text-red-800 block mt-2">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password?.type === 'required' && (
                  <span className="text-red-800 block mt-2">
                    This field is required
                  </span>
                )}
                {errors.password && (
                  <span className="text-red-800 block mt-2">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
