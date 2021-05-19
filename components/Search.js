export default function Search({ handleFormSubmit, setText }) {
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className='mx-4 p-1'
        type='text'
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className='bg-blue-400 py-1 px-4 rounded-md'>
        Search
      </button>
    </form>
  )
}
