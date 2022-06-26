function WelcomeBoard({ title }) {
  return (
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='text-3xl font-black text-center text-gray-900 first-letter:uppercase'>
          welcome to
          <span className='block text-center'>celavie chicken and burger</span>
        </h1>
        <h2 className='mt-6 text-2xl font-extrabold text-center text-gray-900 first-letter:uppercase'>
          {title}
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBoard;
