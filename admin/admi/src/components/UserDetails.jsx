const UserDetails = ({ user, onClose }) => {

    if (!user) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-bold">
                        User Details
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 text-xl"
                    >
                        ✕
                    </button>

                </div>

                <div className="space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>
                        <p className="font-medium">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>
                        <p className="font-medium">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Department
                        </p>
                        <p className="font-medium">
                            {user.department}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Role
                        </p>
                        <p className="font-medium">
                            {user.role}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Status
                        </p>
                        <p className="font-medium">
                            {user.status}
                        </p>
                    </div>

                </div>

                <div className="flex justify-end mt-6">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )
}

export default UserDetails