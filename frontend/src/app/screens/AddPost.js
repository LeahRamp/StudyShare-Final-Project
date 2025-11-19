import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { createPostApi } from '../../services/api/posts';

const AddPost = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        if (result.type !== "cancel") {
            setDocument(result);
        }
    };

    const handleSubmit = async () => {
        if (!subject || !text) {
            alert("Subject and text are required.");
            return;
        }

        setLoading(true);

        try {
            await createPostApi({
                subject,
                title,
                text,
                link,
                image,
                document,
            });

            alert("Post created!");
            navigation.goBack();
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder='Title'
                placeholderTextColor="#777"
                style={styles.input}
            />
            <View style={styles.underline} />

            {/* Subject Picker */}
            <Picker
                selectedValue={subject}
                onValueChange={(itemValue) => setSubject(itemValue)}
                style={{ height: 50, marginBottom: 28 }}
            >
                <Picker.Item label="Select subject..." value="" />

                <Picker.Item label="Biology" value="biology" />
                <Picker.Item label="Chemistry" value="chemistry" />
                <Picker.Item label="Physics" value="physics" />
                <Picker.Item label="Mathematics" value="mathematics" />
                <Picker.Item label="Computer Science" value="computer_science" />
                <Picker.Item label="Information Technology" value="information_technology" />
                <Picker.Item label="Engineering" value="engineering" />
                <Picker.Item label="Environmental Science" value="environmental_science" />
                <Picker.Item label="History" value="history" />
                <Picker.Item label="Literature" value="literature" />
                <Picker.Item label="Philosophy" value="philosophy" />
                <Picker.Item label="Languages" value="languages" />
                <Picker.Item label="Music" value="music" />
                <Picker.Item label="Fine Arts" value="fine_arts" />
                <Picker.Item label="Cultural Studies" value="cultural_studies" />
                <Picker.Item label="Psychology" value="psychology" />
                <Picker.Item label="Sociology" value="sociology" />
                <Picker.Item label="Political Science" value="political_science" />
                <Picker.Item label="Economics" value="economics" />
                <Picker.Item label="Anthropology" value="anthropology" />
                <Picker.Item label="Geography" value="geography" />
                <Picker.Item label="Accounting" value="accounting" />
                <Picker.Item label="Finance" value="finance" />
                <Picker.Item label="Marketing" value="marketing" />
                <Picker.Item label="Management" value="management" />
                <Picker.Item label="Business Administration" value="business_administration" />
                <Picker.Item label="Law" value="law" />
                <Picker.Item label="International Relations" value="international_relations" />
                <Picker.Item label="Medicine" value="medicine" />
                <Picker.Item label="Nursing" value="nursing" />
                <Picker.Item label="Pharmacy" value="pharmacy" />
                <Picker.Item label="Public Health" value="public_health" />
                <Picker.Item label="Physiotherapy" value="physiotherapy" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Media & Communication" value="media_communication" />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Design" value="design" />
                <Picker.Item label="Theology / Religious Studies" value="theology" />
            </Picker>
            <View style={styles.underline} />

            {/* Post Text */}
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Write your post..."
                placeholderTextColor="#777"
                style={[styles.input, { height: 120, textAlignVertical: "top" }]}
                multiline
            />
            <View style={styles.underline} />

            {/* Link */}
            <TextInput
                value={link}
                onChangeText={setLink}
                placeholder='Link (optional)'
                placeholderTextColor="#777"
                style={styles.input}
            />
            <View style={styles.underline} />

            {/* Image Upload */}
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                <Text style={styles.uploadText}>
                    {image ? "Change Image" : "Upload Image"}
                </Text>
            </TouchableOpacity>
            {image && (
                <Image
                    source={{ uri: image.uri }}
                    style={styles.previewImage}
                />
            )}
            <View style={{ height: 20 }} />

            {/* Document Upload */}
            <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                <Text style={styles.uploadText}>
                    {document ? "Change Document" : "Upload Document"}
                </Text>
            </TouchableOpacity>
            {document && <Text style={styles.fileName}>{document.name}</Text>}

            <View style={{ height: 40 }} />

            {/* Submit Button */}
            <TouchableOpacity
                style={[styles.uploadBox, { backgroundColor: "#7CA8F8" }]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={[styles.uploadText, { color: "#fff" }]}>
                    {loading ? "Posting..." : "Create Post"}
                </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

export default AddPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        backgroundColor: "#fff",
    },
    input: {
        fontSize: 15,
        paddingVertical: 6,
        color: "#000",
    },
    underline: {
        width: "100%",
        height: 1,
        backgroundColor: "#585858ff",
        marginBottom: 28,
        marginTop: 3,
    },
    uploadBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    uploadText: {
        fontSize: 15,
        color: "#000",
    },
    previewImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        marginTop: 10,
        borderRadius: 8,
    },
    fileName: {
        marginTop: 10,
        fontSize: 14,
        color: "#333",
    },
});
