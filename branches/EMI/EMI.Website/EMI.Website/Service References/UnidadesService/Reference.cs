﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.18408
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMI.Website.UnidadesService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="UnidadModelResp", Namespace="http://schemas.datacontract.org/2004/07/EMI.Wcf.Servicio.Models")]
    [System.SerializableAttribute()]
    public partial class UnidadModelResp : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string DESCRIPCIONField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int ID_UNIDADField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string UNIDADField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string DESCRIPCION {
            get {
                return this.DESCRIPCIONField;
            }
            set {
                if ((object.ReferenceEquals(this.DESCRIPCIONField, value) != true)) {
                    this.DESCRIPCIONField = value;
                    this.RaisePropertyChanged("DESCRIPCION");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int ID_UNIDAD {
            get {
                return this.ID_UNIDADField;
            }
            set {
                if ((this.ID_UNIDADField.Equals(value) != true)) {
                    this.ID_UNIDADField = value;
                    this.RaisePropertyChanged("ID_UNIDAD");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string UNIDAD {
            get {
                return this.UNIDADField;
            }
            set {
                if ((object.ReferenceEquals(this.UNIDADField, value) != true)) {
                    this.UNIDADField = value;
                    this.RaisePropertyChanged("UNIDAD");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="Paginacion", Namespace="http://schemas.datacontract.org/2004/07/EMI.Wcf.Aplicacion.Modelo")]
    [System.SerializableAttribute()]
    public partial class Paginacion : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private long _dcField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string callbackField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string dirField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int limitField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int pageField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string sortField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int startField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int totalField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public long _dc {
            get {
                return this._dcField;
            }
            set {
                if ((this._dcField.Equals(value) != true)) {
                    this._dcField = value;
                    this.RaisePropertyChanged("_dc");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string callback {
            get {
                return this.callbackField;
            }
            set {
                if ((object.ReferenceEquals(this.callbackField, value) != true)) {
                    this.callbackField = value;
                    this.RaisePropertyChanged("callback");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string dir {
            get {
                return this.dirField;
            }
            set {
                if ((object.ReferenceEquals(this.dirField, value) != true)) {
                    this.dirField = value;
                    this.RaisePropertyChanged("dir");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int limit {
            get {
                return this.limitField;
            }
            set {
                if ((this.limitField.Equals(value) != true)) {
                    this.limitField = value;
                    this.RaisePropertyChanged("limit");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int page {
            get {
                return this.pageField;
            }
            set {
                if ((this.pageField.Equals(value) != true)) {
                    this.pageField = value;
                    this.RaisePropertyChanged("page");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string sort {
            get {
                return this.sortField;
            }
            set {
                if ((object.ReferenceEquals(this.sortField, value) != true)) {
                    this.sortField = value;
                    this.RaisePropertyChanged("sort");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int start {
            get {
                return this.startField;
            }
            set {
                if ((this.startField.Equals(value) != true)) {
                    this.startField = value;
                    this.RaisePropertyChanged("start");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int total {
            get {
                return this.totalField;
            }
            set {
                if ((this.totalField.Equals(value) != true)) {
                    this.totalField = value;
                    this.RaisePropertyChanged("total");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="ListasServicioOfUnidadModelRespLLZUzu_Sn", Namespace="http://schemas.datacontract.org/2004/07/EMI.Wcf.Aplicacion.Modelo")]
    [System.SerializableAttribute()]
    public partial class ListasServicioOfUnidadModelRespLLZUzu_Sn : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private EMI.Website.UnidadesService.UnidadModelResp[] datosField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string msgField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool successField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int totalField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public EMI.Website.UnidadesService.UnidadModelResp[] datos {
            get {
                return this.datosField;
            }
            set {
                if ((object.ReferenceEquals(this.datosField, value) != true)) {
                    this.datosField = value;
                    this.RaisePropertyChanged("datos");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string msg {
            get {
                return this.msgField;
            }
            set {
                if ((object.ReferenceEquals(this.msgField, value) != true)) {
                    this.msgField = value;
                    this.RaisePropertyChanged("msg");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool success {
            get {
                return this.successField;
            }
            set {
                if ((this.successField.Equals(value) != true)) {
                    this.successField = value;
                    this.RaisePropertyChanged("success");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int total {
            get {
                return this.totalField;
            }
            set {
                if ((this.totalField.Equals(value) != true)) {
                    this.totalField = value;
                    this.RaisePropertyChanged("total");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="UnidadesService.IUnidades")]
    public interface IUnidades {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IUnidades/ObtenerUnidadPorId", ReplyAction="http://tempuri.org/IUnidades/ObtenerUnidadPorIdResponse")]
        EMI.Website.UnidadesService.UnidadModelResp ObtenerUnidadPorId(int ID_UNIDAD);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IUnidades/ObtenerUnidadPorId", ReplyAction="http://tempuri.org/IUnidades/ObtenerUnidadPorIdResponse")]
        System.Threading.Tasks.Task<EMI.Website.UnidadesService.UnidadModelResp> ObtenerUnidadPorIdAsync(int ID_UNIDAD);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IUnidades/ObtenerUnidadesPaginados", ReplyAction="http://tempuri.org/IUnidades/ObtenerUnidadesPaginadosResponse")]
        EMI.Website.UnidadesService.ListasServicioOfUnidadModelRespLLZUzu_Sn ObtenerUnidadesPaginados(EMI.Website.UnidadesService.Paginacion paginacion);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IUnidades/ObtenerUnidadesPaginados", ReplyAction="http://tempuri.org/IUnidades/ObtenerUnidadesPaginadosResponse")]
        System.Threading.Tasks.Task<EMI.Website.UnidadesService.ListasServicioOfUnidadModelRespLLZUzu_Sn> ObtenerUnidadesPaginadosAsync(EMI.Website.UnidadesService.Paginacion paginacion);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IUnidadesChannel : EMI.Website.UnidadesService.IUnidades, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class UnidadesClient : System.ServiceModel.ClientBase<EMI.Website.UnidadesService.IUnidades>, EMI.Website.UnidadesService.IUnidades {
        
        public UnidadesClient() {
        }
        
        public UnidadesClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public UnidadesClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public UnidadesClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public UnidadesClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public EMI.Website.UnidadesService.UnidadModelResp ObtenerUnidadPorId(int ID_UNIDAD) {
            return base.Channel.ObtenerUnidadPorId(ID_UNIDAD);
        }
        
        public System.Threading.Tasks.Task<EMI.Website.UnidadesService.UnidadModelResp> ObtenerUnidadPorIdAsync(int ID_UNIDAD) {
            return base.Channel.ObtenerUnidadPorIdAsync(ID_UNIDAD);
        }
        
        public EMI.Website.UnidadesService.ListasServicioOfUnidadModelRespLLZUzu_Sn ObtenerUnidadesPaginados(EMI.Website.UnidadesService.Paginacion paginacion) {
            return base.Channel.ObtenerUnidadesPaginados(paginacion);
        }
        
        public System.Threading.Tasks.Task<EMI.Website.UnidadesService.ListasServicioOfUnidadModelRespLLZUzu_Sn> ObtenerUnidadesPaginadosAsync(EMI.Website.UnidadesService.Paginacion paginacion) {
            return base.Channel.ObtenerUnidadesPaginadosAsync(paginacion);
        }
    }
}