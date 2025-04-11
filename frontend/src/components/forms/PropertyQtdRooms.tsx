interface PropertyQtdRoomsProps {
  roomDefaultValue: string;
  setRoomType: React.Dispatch<React.SetStateAction<string>>;
  roomType: string;
}

const PropertyQtdRooms: React.FC<PropertyQtdRoomsProps> = ({
    roomDefaultValue,
    setRoomType,
    roomType,
  }) => {
    return (
        <select
            id={roomDefaultValue}
            name={roomDefaultValue}
            defaultValue={roomDefaultValue}
            onChange={(e) => setRoomType(e.target.value)}
            required
        >
            <option key="01" value="01">01 {roomType}</option>
            <option key="02" value="02">02 {roomType}s</option>
            <option key="03" value="03">03 {roomType}s</option>
            <option key="04" value="04">04 ou mais {roomType}s</option>
        </select>
    )
}

export default PropertyQtdRooms
