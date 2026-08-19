const TypingIndicator = ({name, isTyping}) => {

    if(!isTyping) return null

    return (

        <div className="flex items-center gap-2 p-4 text-sm text-gray-500">
            <p>{name} is typing...</p>
        </div>

    )

}

export default TypingIndicator;