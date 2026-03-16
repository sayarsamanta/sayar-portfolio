const EmptySection = ({ type, isAdmin = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full 
        bg-[var(--bg-soft)] mb-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-[var(--text-secondary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v-6a2 2 0 012-2h6M9 17H5a2 2 0 01-2-2V7a2 2 0 012-2h6m-2 12h10a2 2 0 002-2v-3"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">{`${type} Not Available`}</h2>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md">
        {isAdmin
          ? `No ${type?.toLowerCase()} details have been added yet. Use the admin panel to add or update professional experience.`
          : `Working ${type?.toLowerCase()} details have not been added yet. Please check back later to view professional experience and career highlights.`}
      </p>
    </div>
  );
};

export default EmptySection;
