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
          '@/components/location'
        );
        await loadGoogleMapsScript();
        const results = await getLocationDetails(locationInput);
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
        className="meetupinputfield"
      />
      <button
        type="button"
        onClick={handleManualLocationSubmit}
        className="meet-up-btn"
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
