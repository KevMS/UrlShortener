import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IFormContainerProps {
  updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { updateReloadState } = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      updateReloadState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-banner my-4 sm:my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full rounded-xl p-4 sm:p-8 lg:p-12 backdrop-brightness-50">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl text-center pb-4">
            URL Shortener
          </h1>
          <p className="text-white text-center pb-2 text-base sm:text-lg font-light">
            Paste Your Untidy Link Here
          </p>
          <p className="text-white text-center pb-4 text-sm sm:text-base font-thin">
            Easily shorten long links with our free tool. Create clean,
            shareable URLs in seconds, perfect for social media, emails, and
            more. Streamline your links effortlessly!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-800"></div>
                <input
                  type="text"
                  placeholder="Add your link"
                  required
                  className="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-white text-sm font-medium h-full bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
                >
                  Shorten URL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
