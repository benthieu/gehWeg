import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';


function FileSaver() {

  const supabase = useSupabaseClient();

    async function saveFile(event: any): Promise<void> {

    const image = event?.target?.files[0]
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload('images/avatar1.png', image, {
        cacheControl: '3600',
        upsert: false
      })
    }

    function alertError(error: any) {
      alert(error);
    }


  return (
    <div>
      <ErrorBoundary
      onError={(error) => alertError(error)}
      FallbackComponent={() => {return (<div>Error occured...</div>)}}>
      <h1>Save File: </h1>
      <input type="file">Save</input>
      <button onClick={(e) => saveFile(e)}>Save</button>
      </ErrorBoundary>
    </div>
  );
}

export default FileSaver;
