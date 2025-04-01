import { useRef, useState } from 'react';

type LocationAccessProps = {
  setLocation: (location: any) => void;
};

const Locationaccess: React.FC<LocationAccessProps> = ({ setLocation }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [locationInput, setLocationInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLocationSet, setIsLocationSet] = useState<boolean>(false);
  
    const handleManualLocationSubmit = async () => {
      if (!locationInput || locationInput.trim().length < 4) {
        setError('Input must be minimum 4 characters');
        return;
      }
      try {
        const { loadGoogleMapsScript, getLocationDetails } = await import(
          '@/utils/location.utils'
        );
        await loadGoogleMapsScript();
        const results = await getLocationDetails(locationInput,"map");
        if (!isLocationSet && results) {
          setIsLocationSet(true);
        }
        if (results) {
          console.log(results);
          setLocation(results);
        } else {
          setError('Please provide a valid place');
        }
      } catch (error) {
        console.error(error);
        setError('Some error occurred, please try again!');
      }
    };
  
  return (
    <div>
       <input
        ref={inputRef}
        type="text"
        value={locationInput}
        placeholder="Enter location"
        onChange={(e) => {
          if (error) {
            setError('');
          }
          setLocationInput(e.target.value);
        }}
          className="border border-black rounded-lg p-1 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleManualLocationSubmit}
        className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check
      </button>
      {error && <p className="text-xs text-pink-600">{error}</p>}

      <div
        id="map"
        className={isLocationSet ? 'w-[20rem] md:w-[40rem] h-[25rem] my-5' : ''}
      ></div>
    </div>
  )
}

export default Locationaccess
